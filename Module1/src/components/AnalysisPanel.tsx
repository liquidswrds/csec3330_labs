import { Paper, Title, Stack, Text, List, Badge, Box, Divider, Group } from '@mantine/core'
import { IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react'
import { Assignment, DropZoneElement } from '../types'

interface AnalysisPanelProps {
  visible: boolean
  assignments: Map<string, Assignment>
  factoryElements: DropZoneElement[]
}

export function AnalysisPanel({ visible, assignments, factoryElements }: AnalysisPanelProps) {
  if (!visible) {
    return (
      <Paper p="lg" radius="md" withBorder h="fit-content" style={{ position: 'sticky' }}>
        <Stack gap="lg">
          <Title order={3} c="black">Analysis Results</Title>
          <Text c="black" ta="center" py="xl">
            Click "Check Answers" to see your results
          </Text>
          
          <Divider />
          
          <Box>
            <Title order={4} mb="md" c="black">Assignment Guide</Title>
            <Stack gap="md">
              <Box>
                <Text fw={600} size="sm" mb="xs" c="black">Functional Areas:</Text>
                <List size="xs" spacing={4}>
                  <List.Item><strong>Production:</strong> Systems that create/process the product</List.Item>
                  <List.Item><strong>Control:</strong> Systems that manage and coordinate operations</List.Item>
                  <List.Item><strong>Monitoring:</strong> Systems that observe and measure processes</List.Item>
                  <List.Item><strong>Logistics:</strong> Systems that handle material flow</List.Item>
                  <List.Item><strong>Maintenance:</strong> Systems that maintain equipment</List.Item>
                  <List.Item><strong>Quality:</strong> Systems that ensure product quality</List.Item>
                </List>
              </Box>
              
              <Box>
                <Text fw={600} size="sm" mb="xs" c="black">Operational Areas:</Text>
                <List size="xs" spacing={4}>
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
    
    // For operational zones, only check operational assignment
    if (element.type === 'operational-zone') {
      const operationalCorrect = assignment.operational === correct.operational
      if (operationalCorrect) {
        correctCount++
        feedback.push({
          text: `${element.name}: ✓ Operational area correctly identified`,
          correct: true,
          type: 'correct'
        })
      } else {
        feedback.push({
          text: `${element.name}: ✗ Incorrect operational area assignment`,
          correct: false,
          type: assignment.operational ? 'incorrect' : 'incomplete'
        })
      }
    } else {
      // For regular elements, only check functional assignment (if it has one)
      if (correct.functional) {
        const functionalCorrect = assignment.functional === correct.functional
        if (functionalCorrect) {
          correctCount++
          feedback.push({
            text: `${element.name}: ✓ Functional area correct`,
            correct: true,
            type: 'correct'
          })
        } else {
          feedback.push({
            text: `${element.name}: ✗ Incorrect functional area assignment`,
            correct: false,
            type: assignment.functional ? 'incorrect' : 'incomplete'
          })
        }
      }
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
      style={{ position: { base: 'static', lg: 'sticky' }, top: 16 } as any}
    >
      <Stack gap="lg">
        <Title order={3} c="black">Analysis Results</Title>
        
        {/* Score Summary */}
        <Box ta="center">
          <Title order={2} c={isComplete ? 'green' : score >= 70 ? 'orange' : 'red'}>
            {score}%
          </Title>
          <Text size="lg" fw={500} c="black">
            {correctCount} of {factoryElements.length} elements correct
          </Text>
          {isComplete && (
            <Badge color="green" size="lg" variant="filled" mt="xs">
              🎉 Perfect Score!
            </Badge>
          )}
        </Box>

        <Divider />

        {/* Detailed Feedback */}
        <Box style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Title order={4} mb="md" c="black">Detailed Feedback</Title>
          <Stack gap="xs">
            {feedback.map((item, index) => (
              <Group key={index} gap="xs" align="flex-start">
                {item.type === 'correct' ? (
                  <IconCheck size={16} color="green" style={{ flexShrink: 0, marginTop: 2 }} />
                ) : item.type === 'incorrect' ? (
                  <IconX size={16} color="red" style={{ flexShrink: 0, marginTop: 2 }} />
                ) : (
                  <IconAlertTriangle size={16} color="orange" style={{ flexShrink: 0, marginTop: 2 }} />
                )}
                <Text 
                  size="sm" 
                  c={item.type === 'correct' ? 'green' : item.type === 'incorrect' ? 'red' : 'orange'}
                >
                  {item.text}
                </Text>
              </Group>
            ))}
          </Stack>
        </Box>

        {/* Encouragement */}
        {!isComplete && (
          <Box>
            <Divider />
            <Text size="sm" c="dimmed" ta="center" fs="italic" mt="md">
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