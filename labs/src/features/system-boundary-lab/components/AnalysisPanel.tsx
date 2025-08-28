import { Paper, Title, Stack, Text, List, Badge, Box, Divider, Group } from '@mantine/core'
import { IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react'
import { Assignment, DropZoneElement } from '../../../shared/types/index'

interface AnalysisPanelProps {
  visible: boolean
  assignments: Map<string, Assignment>
  factoryElements: DropZoneElement[]
}

export function AnalysisPanel({ visible, assignments, factoryElements }: AnalysisPanelProps) {
  if (!visible) {
    return (
      <Paper 
        p="lg" 
        radius="md" 
        withBorder 
        h="fit-content"
        role="region"
        aria-label="Analysis results and assignment guide"
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderColor: '#e0e0e0'
        }}
      >
        <Stack gap="lg">
          <Title order={3} c="black" id="analysis-title">
            Analysis Results
          </Title>
          <Text c="black" ta="center" py="xl" role="status">
            Click "Check Answers" to see your results
          </Text>
          
          <Divider />
          
          <Box role="complementary" aria-labelledby="assignment-guide-title">
            <Title order={4} mb="md" c="black" id="assignment-guide-title">
              Assignment Guide
            </Title>
            <Stack gap="md">
              <Box>
                <Text fw={600} size="sm" mb="xs" c="black" component="h5">
                  Functional Areas:
                </Text>
                <List size="xs" spacing={4} role="list">
                  <List.Item><strong>Production:</strong> Systems that create/process the product</List.Item>
                  <List.Item><strong>Control:</strong> Systems that manage and coordinate operations</List.Item>
                  <List.Item><strong>Monitoring:</strong> Systems that observe and measure processes</List.Item>
                  <List.Item><strong>Logistics:</strong> Systems that handle material flow</List.Item>
                  <List.Item><strong>Maintenance:</strong> Systems that maintain equipment</List.Item>
                  <List.Item><strong>Quality:</strong> Systems that ensure product quality</List.Item>
                </List>
              </Box>
              
              <Box>
                <Text fw={600} size="sm" mb="xs" c="black" component="h5">
                  Operational Areas:
                </Text>
                <List size="xs" spacing={4} role="list">
                  <List.Item><strong>Manufacturing:</strong> Direct production operations</List.Item>
                  <List.Item><strong>Support:</strong> Supporting operational functions</List.Item>
                  <List.Item><strong>External:</strong> Outside organization operations</List.Item>
                  <List.Item><strong>Network:</strong> IT/Network infrastructure</List.Item>
                </List>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    )
  }

  let correctCount = 0
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
      correctCount++
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

  const score = Math.round((correctCount / factoryElements.length) * 100)
  const isComplete = score === 100

  return (
    <Paper 
      p="lg" 
      radius="md" 
      withBorder 
      h="fit-content"
      role="region"
      aria-label="Analysis results and feedback"
      aria-live="polite"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderColor: '#e0e0e0'
      }}
    >
      <Stack gap="lg">
        <Title order={3} c="black" id="results-title">
          Analysis Results
        </Title>
        
        {/* Score Summary */}
        <Box ta="center" role="status" aria-labelledby="score-summary">
          <Title 
            order={2} 
            c={isComplete ? 'success.6' : score >= 70 ? 'warning.6' : 'error.6'}
            id="score-summary"
          >
            {score}%
          </Title>
          <Text size="lg" fw={500} c="black">
            {correctCount} of {factoryElements.length} elements correct
          </Text>
          {isComplete && (
            <Badge color="success" size="lg" variant="filled" mt="xs">
              🎉 Perfect Score!
            </Badge>
          )}
        </Box>

        <Divider />

        {/* Detailed Feedback */}
        <Box 
          style={{ maxHeight: '50vh', overflowY: 'auto' }}
          role="region"
          aria-labelledby="detailed-feedback-title"
        >
          <Title order={4} mb="md" c="black" id="detailed-feedback-title">
            Detailed Feedback
          </Title>
          <Stack gap="xs" role="list">
            {feedback.map((item, index) => (
              <Group key={index} gap="xs" align="flex-start" role="listitem">
                {item.type === 'correct' ? (
                  <IconCheck 
                    size={16} 
                    color="#2e7d32" 
                    style={{ flexShrink: 0, marginTop: 2 }} 
                    aria-label="Correct"
                  />
                ) : item.type === 'incorrect' ? (
                  <IconX 
                    size={16} 
                    color="#d32f2f" 
                    style={{ flexShrink: 0, marginTop: 2 }} 
                    aria-label="Incorrect"
                  />
                ) : (
                  <IconAlertTriangle 
                    size={16} 
                    color="#f57c00" 
                    style={{ flexShrink: 0, marginTop: 2 }} 
                    aria-label="Incomplete"
                  />
                )}
                <Text 
                  size="sm" 
                  c={item.type === 'correct' ? 'success.6' : item.type === 'incorrect' ? 'error.6' : 'warning.6'}
                  component="span"
                >
                  {item.text}
                </Text>
              </Group>
            ))}
          </Stack>
        </Box>

        {/* Encouragement */}
        {!isComplete && (
          <Box role="complementary">
            <Divider />
            <Text size="sm" c="dimmed" ta="center" fs="italic" mt="md" component="p">
              {score >= 80 
                ? "Almost there! Review the feedback above."
                : score >= 50 
                ? "Good progress! Keep working on the assignments."
                : "Keep going! Try dragging more labels to complete assignments."
              }
            </Text>
          </Box>
        )}
      </Stack>
    </Paper>
  )
}