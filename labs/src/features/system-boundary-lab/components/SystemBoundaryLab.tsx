import { useState } from 'react'
import {
  AppShell,
  Title,
  Text,
  Button,
  Container,
  Group,
  Stack,
  ActionIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DndContext } from '@dnd-kit/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { FUNCTIONAL_AREAS, OPERATIONAL_AREAS } from '../../../shared/types/index'
import { FactoryLayout } from './FactoryLayout'
import { ControlPanel } from './ControlPanel'
import { AnalysisPanel } from './AnalysisPanel'
import { TutorialModal } from './TutorialModal'
import { useLabState } from '../hooks/useLabState'
import { useDragAndDrop } from '../hooks/useDragAndDrop'

// Enhanced scrollbar, layout and accessibility styles
const scrollbarStyles = `
  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: ButtonText !important;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* Focus indication */
  *:focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  /* Custom scrollbars for webkit browsers */
  .custom-scrollbar::-webkit-scrollbar,
  .sticky-panel::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track,
  .sticky-panel::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb,
  .sticky-panel::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover,
  .sticky-panel::-webkit-scrollbar-thumb:hover {
    background: #9e9e9e;
  }
  
  /* Factory layout scrollbar */
  .factory-scroll::-webkit-scrollbar {
    width: 10px;
  }
  .factory-scroll::-webkit-scrollbar-track {
    background: #fafafa;
    border-radius: 5px;
  }
  .factory-scroll::-webkit-scrollbar-thumb {
    background: #757575;
    border-radius: 5px;
  }
  .factory-scroll::-webkit-scrollbar-thumb:hover {
    background: #616161;
  }
  
  /* Prevent horizontal scrolling during drag operations */
  body.dragging {
    overflow-x: hidden !important;
  }
  
  html, body {
    overflow-x: hidden;
    position: relative;
    height: 100%;
  }
  
  * {
    box-sizing: border-box;
  }
  
  /* Sticky panels with proper viewport constraints */
  .sticky-panel {
    position: sticky !important;
    top: 20px !important;
    height: fit-content !important;
    z-index: 10 !important;
    scroll-behavior: smooth;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Factory layout container */
  .factory-scroll {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #757575 #fafafa;
  }
  
  /* Enhanced focus states for keyboard navigation */
  .mantine-Button-root:focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
  }
  
  .mantine-ActionIcon-root:focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
  }
`

export function SystemBoundaryLab() {
  const navigate = useNavigate()
  const [tutorialOpened, { open: openTutorial, close: closeTutorial }] = useDisclosure(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const {
    assignments,
    showCorrectAnswers,
    factoryElements,
    setShowCorrectAnswers,
    handleAssignment,
    handleKeyboardAssignment,
    removeAssignment,
    analyzeAssignments,
    resetLab
  } = useLabState()

  const { handleDragStart, handleDragEnd } = useDragAndDrop({
    onAssignment: handleAssignment
  })

  // Convert assignments object to Map for compatibility with existing components
  const assignmentsMap = new Map(Object.entries(assignments))

  const handleAnalyze = () => {
    analyzeAssignments()
    setShowAnalysis(true)
  }

  const handleReset = () => {
    resetLab()
    setShowAnalysis(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <AppShell
        padding="md"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Container 
          size="xl" 
          className="custom-scrollbar" 
          style={{ 
            position: 'relative',
            overflow: 'visible' 
          }}
        >
          <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between" align="center">
              <Group gap="md">
                <ActionIcon 
                  variant="light" 
                  size="lg" 
                  onClick={() => navigate('/')}
                  aria-label="Go back to dashboard"
                  title="Return to dashboard"
                >
                  <IconArrowLeft size={18} aria-hidden="true" />
                </ActionIcon>
                <div>
                  <Title order={1} size="h2" id="lab-title">System Boundary Lab 1.1</Title>
                  <Text size="lg" c="dimmed" id="lab-description">Operational vs Functional Areas</Text>
                </div>
              </Group>

              <Group gap="sm">
                <Button 
                  variant="outline" 
                  onClick={openTutorial}
                  aria-describedby="lab-description"
                >
                  Tutorial
                </Button>
                <Button 
                  onClick={handleAnalyze}
                  disabled={Object.keys(assignments).length === 0}
                  aria-label={`Check answers ${Object.keys(assignments).length === 0 ? '(disabled - no assignments made)' : ''}`}
                >
                  Check Answers
                </Button>
                <Button 
                  variant="outline" 
                  color="error"
                  onClick={handleReset}
                  disabled={Object.keys(assignments).length === 0}
                  aria-label={`Reset all assignments ${Object.keys(assignments).length === 0 ? '(disabled - no assignments to reset)' : ''}`}
                >
                  Reset
                </Button>
                <Button
                  variant="subtle"
                  onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
                  aria-label={`${showCorrectAnswers ? 'Hide' : 'Show'} correct answers`}
                  aria-pressed={showCorrectAnswers}
                >
                  {showCorrectAnswers ? 'Hide' : 'Show'} Answers
                </Button>
              </Group>
            </Group>

            {/* Screen Reader Instructions */}
            <div className="sr-only" role="region" aria-live="polite" id="sr-instructions">
              <p>
                Welcome to the System Boundary Lab. This lab has three main sections:
                1. Control panel on the left with draggable labels
                2. Factory layout in the center with drop zones
                3. Analysis panel on the right with feedback
              </p>
              <p>
                For keyboard users: Each drop zone has a keyboard icon button that opens an accessible assignment interface.
                You can also use the "Keyboard Mode" button in the factory layout header.
              </p>
              <p>
                Screen reader users: Drag and drop operations will be announced. 
                Assignment status changes are announced in the analysis panel.
              </p>
            </div>

            {/* Lab Content */}
            <DndContext
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              accessibility={{
                announcements: {
                  onDragStart: ({ active }) => `Picked up ${active.data.current?.areaType} area: ${active.id}`,
                  onDragOver: ({ active, over }) => 
                    over ? `${active.data.current?.areaType} area ${active.id} is over drop zone ${over.id}` : '',
                  onDragEnd: ({ active, over }) => 
                    over ? `${active.data.current?.areaType} area ${active.id} was dropped over ${over.id}` : 
                    `${active.data.current?.areaType} area ${active.id} was dropped`,
                  onDragCancel: ({ active }) => `Dragging ${active.data.current?.areaType} area ${active.id} was cancelled`
                }
              }}
            >
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                alignItems: 'flex-start'
              }}>
                {/* Control Panel */}
                <div 
                  className="sticky-panel"
                  role="complementary"
                  aria-label="Draggable labels and controls"
                  style={{ 
                    minWidth: '280px', 
                    maxWidth: '320px',
                    maxHeight: 'calc(100vh - 140px)', // Fit within viewport
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'thin' // Firefox
                  }}
                >
                  <ControlPanel
                    functionalAreas={FUNCTIONAL_AREAS}
                    operationalAreas={OPERATIONAL_AREAS}
                  />
                </div>

                {/* Factory Layout */}
                <div 
                  className="factory-scroll"
                  role="main"
                  aria-labelledby="lab-title"
                  aria-describedby="lab-description"
                  style={{ 
                    flex: 1, 
                    minWidth: 0,
                    height: 'calc(100vh - 140px)', // Full viewport minus header space
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    padding: '0 8px'
                  }}
                >
                  <FactoryLayout
                    elements={factoryElements}
                    assignments={assignmentsMap}
                    onRemoveAssignment={removeAssignment}
                    onAssignment={handleKeyboardAssignment}
                  />
                </div>

                {/* Analysis Panel */}
                <div 
                  className="sticky-panel"
                  role="complementary"
                  aria-label="Analysis and feedback panel"
                  aria-live="polite"
                  style={{ 
                    minWidth: '300px', 
                    maxWidth: '350px',
                    maxHeight: 'calc(100vh - 140px)', // Fit within viewport
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'thin' // Firefox
                  }}
                >
                  <AnalysisPanel
                    visible={showAnalysis}
                    assignments={assignmentsMap}
                    factoryElements={factoryElements}
                  />
                </div>
              </div>
            </DndContext>
          </Stack>
        </Container>

        {/* Tutorial Modal */}
        <TutorialModal
          opened={tutorialOpened}
          onClose={closeTutorial}
        />
      </AppShell>
    </>
  )
}