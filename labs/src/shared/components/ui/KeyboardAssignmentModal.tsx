import { Modal, Stack, Title, Text, Button, Group, Divider, Paper, Radio, ScrollArea } from '@mantine/core'
import { useState } from 'react'
import { FUNCTIONAL_AREAS, OPERATIONAL_AREAS } from '../../types/index'

interface KeyboardAssignmentModalProps {
  opened: boolean
  onClose: () => void
  selectedElement: string | null
  elementName: string
  elementDescription: string
  onAssign: (elementId: string, assignment: { functional?: string; operational?: string }) => void
  currentAssignment?: { functional?: string | null; operational?: string | null }
}

export function KeyboardAssignmentModal({
  opened,
  onClose,
  selectedElement,
  elementName,
  elementDescription,
  onAssign,
  currentAssignment
}: KeyboardAssignmentModalProps) {
  const [functionalArea, setFunctionalArea] = useState(currentAssignment?.functional || '')
  const [operationalArea, setOperationalArea] = useState(currentAssignment?.operational || '')

  const handleAssign = () => {
    if (selectedElement) {
      onAssign(selectedElement, {
        functional: functionalArea || undefined,
        operational: operationalArea || undefined
      })
    }
    onClose()
  }

  const hasChanges = functionalArea !== (currentAssignment?.functional || '') ||
                    operationalArea !== (currentAssignment?.operational || '')

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="System Classification Assistant"
      size="xl"
      centered
      aria-labelledby="assignment-modal-title"
      closeButtonProps={{
        'aria-label': 'Close system classification assistant'
      }}
    >
      <ScrollArea h={600}>
        <Stack gap="lg">
          <div>
            <Title order={3} id="assignment-modal-title" mb="xs">
              Classifying: {elementName}
            </Title>
            <Paper p="md" radius="md" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
              <Text fw={500} mb="xs">System Details:</Text>
              <Text size="sm">{elementDescription}</Text>
            </Paper>
          </div>

          <Divider />

          <div>
            <Title order={4} mb="md">Step 1: What does this system DO? (Functional Classification)</Title>
            <Text size="sm" c="dimmed" mb="md">
              Functional areas describe the PURPOSE and ACTIVITIES of a system. Consider what operations this system performs.
            </Text>
            
            <Radio.Group
              value={functionalArea}
              onChange={setFunctionalArea}
              aria-label="Select functional area classification"
            >
              <Stack gap="md">
                {FUNCTIONAL_AREAS.map((area) => (
                  <Paper key={area.id} p="md" radius="md" style={{ border: '1px solid #e9ecef' }}>
                    <Radio
                      value={area.id}
                      label={
                        <div>
                          <Text fw={500} size="sm" mb="xs">{area.label}</Text>
                          <Text size="xs" c="dimmed">
                            {area.description}
                          </Text>
                        </div>
                      }
                      styles={{
                        body: { alignItems: 'flex-start' },
                        labelWrapper: { marginLeft: '8px', flex: 1 }
                      }}
                    />
                  </Paper>
                ))}
                <Paper p="md" radius="md" style={{ border: '1px solid #e9ecef' }}>
                  <Radio
                    value=""
                    label={
                      <div>
                        <Text fw={500} size="sm" mb="xs">No Assignment</Text>
                        <Text size="xs" c="dimmed">
                          Clear the functional area assignment for this system.
                        </Text>
                      </div>
                    }
                    styles={{
                      body: { alignItems: 'flex-start' },
                      labelWrapper: { marginLeft: '8px', flex: 1 }
                    }}
                  />
                </Paper>
              </Stack>
            </Radio.Group>
          </div>

          <Divider />

          <div>
            <Title order={4} mb="md">Step 2: How is this system ORGANIZED? (Operational Classification)</Title>
            <Text size="sm" c="dimmed" mb="md">
              Operational areas describe the ORGANIZATIONAL STRUCTURE and LOCATION of systems within the facility.
            </Text>
            
            <Radio.Group
              value={operationalArea}
              onChange={setOperationalArea}
              aria-label="Select operational area classification"
            >
              <Stack gap="md">
                {OPERATIONAL_AREAS.map((area) => (
                  <Paper key={area.id} p="md" radius="md" style={{ border: '1px solid #e9ecef' }}>
                    <Radio
                      value={area.id}
                      label={
                        <div>
                          <Text fw={500} size="sm" mb="xs">{area.label}</Text>
                          <Text size="xs" c="dimmed">
                            {area.description}
                          </Text>
                        </div>
                      }
                      styles={{
                        body: { alignItems: 'flex-start' },
                        labelWrapper: { marginLeft: '8px', flex: 1 }
                      }}
                    />
                  </Paper>
                ))}
                <Paper p="md" radius="md" style={{ border: '1px solid #e9ecef' }}>
                  <Radio
                    value=""
                    label={
                      <div>
                        <Text fw={500} size="sm" mb="xs">No Assignment</Text>
                        <Text size="xs" c="dimmed">
                          Clear the operational area assignment for this system.
                        </Text>
                      </div>
                    }
                    styles={{
                      body: { alignItems: 'flex-start' },
                      labelWrapper: { marginLeft: '8px', flex: 1 }
                    }}
                  />
                </Paper>
              </Stack>
            </Radio.Group>
          </div>

          <Divider />

          {currentAssignment && (currentAssignment.functional || currentAssignment.operational) && (
            <Paper p="md" radius="md" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
              <Text size="sm" fw={500} mb="xs">Current Classifications:</Text>
              {currentAssignment.functional && (
                <Text size="sm">
                  Functional: {FUNCTIONAL_AREAS.find(a => a.id === currentAssignment.functional)?.label || currentAssignment.functional}
                </Text>
              )}
              {currentAssignment.operational && (
                <Text size="sm">
                  Operational: {OPERATIONAL_AREAS.find(a => a.id === currentAssignment.operational)?.label || currentAssignment.operational}
                </Text>
              )}
            </Paper>
          )}

          <Group justify="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={!hasChanges && !functionalArea && !operationalArea}
            >
              {currentAssignment ? 'Update Classification' : 'Apply Classification'}
            </Button>
          </Group>
        </Stack>
      </ScrollArea>
    </Modal>
  )
}