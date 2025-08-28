import { Modal, Stack, Title, Text, List, Button, Group } from '@mantine/core'
import { IconPlayerPlay, IconTarget, IconDragDrop } from '@tabler/icons-react'

interface TutorialModalProps {
  opened: boolean
  onClose: () => void
}

export function TutorialModal({ opened, onClose }: TutorialModalProps) {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title="Cookie Factory Lab Tutorial"
      size="lg"
      centered
      aria-labelledby="tutorial-title"
      aria-describedby="tutorial-description"
      closeButtonProps={{
        'aria-label': 'Close tutorial modal'
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
      }}
      transitionProps={{
        transition: 'fade',
        duration: 200
      }}
    >
      <Stack gap="lg" role="article">
        <Stack gap="md">
          <Group gap="sm">
            <IconTarget size={24} color="#1976d2" aria-hidden="true" />
            <Title order={3} id="tutorial-title">Lab Objective</Title>
          </Group>
          <Text id="tutorial-description">
            Analyze the Cookie Manufacturing Company's production facility by identifying 
            both functional areas (what each system does) and operational areas (how different 
            groups of systems are organized).
          </Text>
        </Stack>

        <Stack gap="md">
          <Group gap="sm">
            <IconDragDrop size={24} color="#2e7d32" aria-hidden="true" />
            <Title order={3}>How to Complete the Lab</Title>
          </Group>
          <List spacing="sm">
            <List.Item>
              <strong>Step 1 - Identify Operational Areas:</strong> Look at each "Operational Group" 
              and drag the correct orange operational label (Manufacturing, Support, External, Network) 
              to the drop zone at the top of each group.
            </List.Item>
            <List.Item>
              <strong>Step 2 - Assign Functional Areas:</strong> For each individual system and component, 
              drag the appropriate green functional label (Production, Control, Monitoring, Logistics, 
              Maintenance, Quality) based on what that system does.
            </List.Item>
            <List.Item>
              <strong>Remove Assignments:</strong> Click the × on any assignment badge to remove it.
            </List.Item>
            <List.Item>
              <strong>Check Progress:</strong> Watch the progress bar fill as you make assignments.
            </List.Item>
            <List.Item>
              <strong>Get Feedback:</strong> Click "Check Answers" to see your score and detailed feedback.
            </List.Item>
          </List>
        </Stack>

        <Stack gap="md">
          <Group gap="sm">
            <IconPlayerPlay size={24} color="#f57c00" aria-hidden="true" />
            <Title order={3}>Quick Reference</Title>
          </Group>
          <Stack gap="xs">
            <Text size="sm"><strong>Functional Areas</strong> (what systems do):</Text>
            <Text size="xs" c="dimmed" pl="md">
              Production • Control • Monitoring • Logistics • Maintenance • Quality Assurance
            </Text>
            <Text size="sm"><strong>Operational Areas</strong> (how systems are grouped):</Text>
            <Text size="xs" c="dimmed" pl="md">
              Manufacturing • Support • External • Network
            </Text>
          </Stack>
        </Stack>

        <Button 
          onClick={onClose} 
          fullWidth 
          size="md" 
          variant="filled"
          autoFocus
          aria-describedby="tutorial-description"
        >
          Start Lab
        </Button>
      </Stack>
    </Modal>
  )
}