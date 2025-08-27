import { useState } from 'react'
import {
  AppShell,
  Title,
  Text,
  Button,
  Container,
  Group,
  Stack,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Assignment, FUNCTIONAL_AREAS, OPERATIONAL_AREAS } from './types'
import { FactoryLayout } from './components/FactoryLayout'
import { ControlPanel } from './components/ControlPanel'
import { AnalysisPanel } from './components/AnalysisPanel'
import { TutorialModal } from './components/TutorialModal'
import { generateFactoryElements } from './utils/factoryData'

// Add scrollbar and drag styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f3f4;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c1c8cd;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a8b0b8;
  }
  
  /* Prevent horizontal scrolling during drag operations */
  body.dragging {
    overflow-x: hidden !important;
  }
  
  html, body {
    overflow-x: hidden;
  }
  
  * {
    box-sizing: border-box;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = scrollbarStyles;
  document.head.appendChild(styleSheet);
}

function App() {
  const [assignments, setAssignments] = useState<Map<string, Assignment>>(new Map())
  const [tutorialOpened, { open: openTutorial, close: closeTutorial }] = useDisclosure(false)
  const [resultsVisible, setResultsVisible] = useState(false)
  
  const factoryElements = generateFactoryElements()

  const handleDragStart = () => {
    document.body.classList.add('dragging')
  }

  const handleDragEnd = (event: DragEndEvent) => {
    document.body.classList.remove('dragging')
    
    const { active, over } = event
    
    if (!over) return

    const draggedItem = active.data.current as { areaType: string; area: string }
    const targetElementId = over.id as string

    if (!draggedItem || !targetElementId) return

    setAssignments(prev => {
      const newAssignments = new Map(prev)
      const currentAssignment = newAssignments.get(targetElementId) || { functional: null, operational: null }
      
      if (draggedItem.areaType === 'functional') {
        currentAssignment.functional = draggedItem.area
      } else if (draggedItem.areaType === 'operational') {
        currentAssignment.operational = draggedItem.area
      }
      
      newAssignments.set(targetElementId, currentAssignment)
      return newAssignments
    })

    notifications.show({
      title: 'Assignment Added',
      message: `${draggedItem.areaType} area "${draggedItem.area}" assigned successfully`,
      color: 'green',
      autoClose: 2000,
    })
  }

  const removeAssignment = (elementId: string, assignmentType: 'functional' | 'operational') => {
    setAssignments(prev => {
      const newAssignments = new Map(prev)
      const currentAssignment = newAssignments.get(elementId)
      
      if (currentAssignment) {
        currentAssignment[assignmentType] = null
        
        if (!currentAssignment.functional && !currentAssignment.operational) {
          newAssignments.delete(elementId)
        } else {
          newAssignments.set(elementId, currentAssignment)
        }
      }
      
      return newAssignments
    })
    
    notifications.show({
      title: 'Assignment Removed',
      message: `${assignmentType} assignment removed`,
      color: 'orange',
      autoClose: 2000,
    })
  }

  const resetAllAssignments = () => {
    setAssignments(new Map())
    setResultsVisible(false)
    notifications.show({
      title: 'Reset Complete',
      message: 'All assignments have been cleared',
      color: 'blue',
      autoClose: 2000,
    })
  }

  const checkAnswers = () => {
    let correctElementsCount = 0
    const feedback: Array<{ text: string; correct: boolean; type: string }> = []
    
    factoryElements.forEach(element => {
      const assignment = assignments.get(element.id) || { functional: null, operational: null }
      const correct = element.correctAnswer
      
      let elementIsCorrect = true
      let elementFeedback = `${element.name}: `
      
      // Check if this is a functional-only answer
      if ('functional' in correct && !('operational' in correct)) {
        const functionalCorrect = assignment.functional === correct.functional
        if (functionalCorrect) {
          elementFeedback += `✓ Functional area correctly identified as ${correct.functional}`
        } else {
          elementIsCorrect = false
          elementFeedback += `✗ Incorrect functional area assignment (should be ${correct.functional})`
        }
      }
      // Check if this is an operational-only answer
      else if ('operational' in correct && !('functional' in correct)) {
        const operationalCorrect = assignment.operational === correct.operational
        if (operationalCorrect) {
          elementFeedback += `✓ Operational area correctly identified as ${correct.operational}`
        } else {
          elementIsCorrect = false
          elementFeedback += `✗ Incorrect operational area assignment (should be ${correct.operational})`
        }
      }
      
      if (elementIsCorrect) {
        correctElementsCount++
        feedback.push({
          text: elementFeedback,
          correct: true,
          type: 'correct'
        })
      } else {
        feedback.push({
          text: elementFeedback,
          correct: false,
          type: (assignment.functional || assignment.operational) ? 'incorrect' : 'incomplete'
        })
      }
    })

    const totalElements = factoryElements.length
    const score = Math.round((correctElementsCount / totalElements) * 100)
    setResultsVisible(true)
    
    notifications.show({
      title: 'Results Calculated',
      message: `Your score: ${score}% (${correctElementsCount}/${totalElements})`,
      color: score === 100 ? 'green' : score >= 70 ? 'orange' : 'red',
      autoClose: 5000,
    })
  }

  // Count elements that have been correctly completed (for progress bar)
  const correctlyCompletedCount = factoryElements.reduce((count, element) => {
    const assignment = assignments.get(element.id)
    if (!assignment) return count
    
    const correct = element.correctAnswer
    let isCorrect = true
    
    // Check if this is a functional-only answer
    if ('functional' in correct && !('operational' in correct)) {
      if (assignment.functional !== correct.functional) {
        isCorrect = false
      }
    }
    // Check if this is an operational-only answer
    else if ('operational' in correct && !('functional' in correct)) {
      if (assignment.operational !== correct.operational) {
        isCorrect = false
      }
    }
    
    return count + (isCorrect ? 1 : 0)
  }, 0)

  // Count elements that have any assignments (for button enable/disable)
  const anyAssignmentsCount = Array.from(assignments.values()).reduce((count, assignment) => {
    return count + (assignment.functional || assignment.operational ? 1 : 0)
  }, 0)

  // Count total elements that need grading - should be exactly 20 graded items
  // Each element counts as 1 item regardless of whether it needs functional, operational, or both
  const totalPossible = factoryElements.length

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <AppShell
        header={{ height: { base: 180, md: 140 } }}
        padding={0}
        styles={{
          main: {
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh',
            overflowX: 'hidden',
            padding: 0,
          }
        }}
      >
        <AppShell.Header>
          <Container size="xl" h="100%">
            <Stack justify="center" h="100%" gap="xs">
              <Group justify="space-between" align="center" wrap="nowrap">
                <Group align="center" gap="md">
                  <Title 
                    order={1} 
                    c="white" 
                    fw={700}
                    style={{ lineHeight: 1.2 }}
                  >
                    Cookie Factory System Analysis
                  </Title>
                </Group>
                
                <Group align="center" gap="md">
                  {/* Progress Bar */}
                  <Group align="center" gap="xs">
                    <Text c="white" size="sm" fw={500}>
                      Progress: {correctlyCompletedCount}/{totalPossible}
                    </Text>
                    <div style={{ width: 120, height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${totalPossible > 0 ? (correctlyCompletedCount / totalPossible) * 100 : 0}%`, 
                        height: '100%', 
                        backgroundColor: '#40c057',
                        borderRadius: 4,
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </Group>
                  
                  {/* Action Buttons */}
                  <Group gap="xs">
                    <Button
                      variant="light"
                      color="gray"
                      size="sm"
                      onClick={resetAllAssignments}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="filled"
                      color="blue"
                      size="sm"
                      onClick={checkAnswers}
                      disabled={anyAssignmentsCount === 0}
                    >
                      Check
                    </Button>
                    <Button
                      variant="filled"
                      color="green"
                      size="sm"
                      onClick={openTutorial}
                    >
                      Tutorial
                    </Button>
                  </Group>
                </Group>
              </Group>
              <Text 
                c="white" 
                size="md" 
                opacity={0.9}
                ta="center"
              >
                Drag functional and operational area labels to identify system boundaries
              </Text>
            </Stack>
          </Container>
        </AppShell.Header>

        <AppShell.Main style={{ paddingTop: 0 }}>
          <div style={{ display: 'flex', minHeight: '100%' }}>
            {/* Fixed Control Panel */}
            <div className="custom-scrollbar" style={{ 
              width: '280px', 
              height: 'calc(100vh - 140px)',
              position: 'fixed',
              left: 0, 
              top: '140px', 
              overflowY: 'auto',
              padding: '1rem',
              borderRight: '1px solid #e9ecef',
              backgroundColor: '#f8f9fa',
              zIndex: 100
            }}>
              <ControlPanel
                functionalAreas={FUNCTIONAL_AREAS}
                operationalAreas={OPERATIONAL_AREAS}
              />
            </div>
            
            {/* Scrollable Middle Content */}
            <div style={{ 
              marginLeft: '280px', 
              marginRight: '320px', 
              flex: 1, 
              padding: '1rem',
              minHeight: '100vh',
              marginTop: '140px',
            }}>
              <FactoryLayout
                elements={factoryElements}
                assignments={assignments}
                onRemoveAssignment={removeAssignment}
              />
            </div>
            
            {/* Fixed Analysis Panel */}
            <div style={{ 
              width: '320px', 
              position: 'fixed', 
              right: 0, 
              top: '140px', 
              height: 'calc(100vh - 140px)',
              overflowY: 'auto',
              padding: '1rem',
              borderLeft: '1px solid #e9ecef',
              backgroundColor: '#f8f9fa',
              zIndex: 100,
              scrollbarWidth: 'thin'
            }}>
              <AnalysisPanel
                visible={resultsVisible}
                assignments={assignments}
                factoryElements={factoryElements}
              />
            </div>
          </div>
        </AppShell.Main>

        <TutorialModal opened={tutorialOpened} onClose={closeTutorial} />
      </AppShell>
    </DndContext>
  )
}

export default App