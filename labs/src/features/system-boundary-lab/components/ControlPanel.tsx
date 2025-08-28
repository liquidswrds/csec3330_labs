import { Paper, Title, Stack, Text } from '@mantine/core'
import { DraggableLabel } from '../../../shared/components/ui/DraggableLabel'

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
      role="region"
      aria-label="Draggable labels control panel"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderColor: '#e0e0e0'
      }}
    >
      <Stack gap="lg">
        <Title order={3} c="black" ta="center" id="control-panel-title">
          Control Panel
        </Title>
        
        {/* Functional Areas */}
        <Stack gap="sm" role="group" aria-labelledby="functional-areas-title">
          <Title order={4} c="success.6" id="functional-areas-title">
            Functional Areas
          </Title>
          <Text size="sm" c="black" component="p">
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
        <Stack gap="sm" role="group" aria-labelledby="operational-areas-title">
          <Title order={4} c="warning.6" id="operational-areas-title">
            Operational Areas
          </Title>
          <Text size="sm" c="black" component="p">
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