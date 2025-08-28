import { Modal, Stack, Title, Text, Button, Group, Select, Divider } from '@mantine/core'
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

  const functionalOptions = FUNCTIONAL_AREAS.map(area => ({
    value: area.id,
    label: area.label
  }))

  const operationalOptions = OPERATIONAL_AREAS.map(area => ({
    value: area.id,
    label: area.label
  }))

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
      title="Assign Areas - Keyboard Interface"
      size="md"
      centered
      aria-labelledby="assignment-modal-title"
      closeButtonProps={{
        'aria-label': 'Close assignment modal'
      }}
    >
      <Stack gap="md">
        <div>
          <Title order={4} id="assignment-modal-title" mb="xs">
            Assigning Areas for: {elementName}
          </Title>
          <Text size="sm" c="dimmed">
            {elementDescription}
          </Text>
        </div>

        <Divider />

        <Stack gap="md">
          <div>
            <Text fw={500} mb="xs">Functional Area Assignment</Text>
            <Text size="xs" c="dimmed" mb="sm">
              What does this system DO? (Production, Control, Monitoring, etc.)
            </Text>
            <Select
              placeholder="Select functional area..."
              data={functionalOptions}
              value={functionalArea}
              onChange={(value) => setFunctionalArea(value || '')}
              searchable
              clearable
              aria-label={`Select functional area for ${elementName}`}
            />
          </div>

          <div>
            <Text fw={500} mb="xs">Operational Area Assignment</Text>
            <Text size="xs" c="dimmed" mb="sm">
              How is this system ORGANIZED? (Manufacturing, Support, External, Network)
            </Text>
            <Select
              placeholder="Select operational area..."
              data={operationalOptions}
              value={operationalArea}
              onChange={(value) => setOperationalArea(value || '')}
              searchable
              clearable
              aria-label={`Select operational area for ${elementName}`}
            />
          </div>
        </Stack>

        <Divider />

        {currentAssignment && (currentAssignment.functional || currentAssignment.operational) && (
          <div>
            <Text size="sm" fw={500} mb="xs">Current Assignments:</Text>
            {currentAssignment.functional && (
              <Text size="sm">Functional: {currentAssignment.functional}</Text>
            )}
            {currentAssignment.operational && (
              <Text size="sm">Operational: {currentAssignment.operational}</Text>
            )}
          </div>
        )}

        <Group justify="flex-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign}
            disabled={!hasChanges && !functionalArea && !operationalArea}
          >
            {currentAssignment ? 'Update Assignment' : 'Assign Areas'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}