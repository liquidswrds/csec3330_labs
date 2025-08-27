import { Paper, Title, Stack, Text } from '@mantine/core'
import { DraggableLabel } from './DraggableLabel'

interface ControlPanelProps {
  functionalAreas: readonly { id: string; label: string; color: string }[]
  operationalAreas: readonly { id: string; label: string; color: string }[]
}

export function ControlPanel({
  functionalAreas,
  operationalAreas
}: ControlPanelProps) {

  return (
    <Paper 
      p="lg" 
      radius="md" 
      withBorder 
      h="fit-content"
    >
      <Stack gap="lg">
        <Title order={3} c="dark" ta="center">Control Panel</Title>
        
        {/* Functional Areas */}
        <Stack gap="sm">
          <Title order={4} c="green.7">Functional Areas</Title>
          <Text size="sm" c="dimmed">
            Systems that perform specific functions
          </Text>
          {functionalAreas.map(area => (
            <DraggableLabel
              key={area.id}
              id={`functional-${area.id}`}
              areaType="functional"
              area={area.id}
              label={area.label}
              color={area.color}
            />
          ))}
        </Stack>

        {/* Operational Areas */}
        <Stack gap="sm">
          <Title order={4} c="orange.7">Operational Areas</Title>
          <Text size="sm" c="dimmed">
            How systems are organized and grouped
          </Text>
          {operationalAreas.map(area => (
            <DraggableLabel
              key={area.id}
              id={`operational-${area.id}`}
              areaType="operational"
              area={area.id}
              label={area.label}
              color={area.color}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}