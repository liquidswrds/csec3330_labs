import { Paper, Title, Text, Stack, SimpleGrid } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DropZone } from '../../../shared/components/ui/DropZone'
import { KeyboardAssignmentModal } from '../../../shared/components/ui/KeyboardAssignmentModal'
import { Assignment, DropZoneElement } from '../../../shared/types/index'
import { OPERATIONAL_COLORS, DEFAULT_COLORS } from '../../../shared/utils/colors'
import { useState } from 'react'

interface FactoryLayoutProps {
  elements: DropZoneElement[]
  assignments: Map<string, Assignment>
  onRemoveAssignment: (elementId: string, assignmentType: 'functional' | 'operational') => void
  onAssignment?: (elementId: string, assignment: { functional?: string; operational?: string }) => void
}

export function FactoryLayout({ elements, assignments, onRemoveAssignment, onAssignment }: FactoryLayoutProps) {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [selectedElement, setSelectedElement] = useState<{ id: string; name: string; description: string } | null>(null)

  const handleKeyboardAssign = (element: DropZoneElement) => {
    setSelectedElement({
      id: element.id,
      name: element.name,
      description: element.description || ''
    })
    openModal()
  }

  const handleAssignmentFromModal = (elementId: string, assignment: { functional?: string; operational?: string }) => {
    if (onAssignment) {
      onAssignment(elementId, assignment)
    }
    closeModal()
  }
  // Define which functional zones belong to which operational groups
  const functionalZoneMapping = {
    external: ['flour-supplier', 'packaging-supplier', 'quality-lab', 'distributors', 'regulatory-agency'],
    manufacturing: [
      'ingredient-preparation-functional-zone',
      'mixing-recipe-functional-zone', 
      'cookie-forming-functional-zone',
      'baking-operations-functional-zone',
      'cooling-systems-functional-zone',
      'packaging-finishing-functional-zone',
      'production-monitoring-functional-zone'
    ],
    support: [
      'process-control-functional-zone',
      'quality-assurance-functional-zone', 
      'maintenance-operations-functional-zone',
      'environmental-monitoring-functional-zone'
    ],
    network: [
      'data-center-functional-zone',
      'network-infrastructure-functional-zone',
      'security-surveillance-functional-zone'
    ]
  }

  // Group elements by operational area for layout
  const externalElements = elements.filter(e => 
    ('operational' in e.correctAnswer && e.correctAnswer.operational === 'external') ||
    functionalZoneMapping.external.includes(e.id)
  )
  const manufacturingElements = elements.filter(e => 
    ('operational' in e.correctAnswer && e.correctAnswer.operational === 'manufacturing') ||
    functionalZoneMapping.manufacturing.includes(e.id)
  )
  const supportElements = elements.filter(e => 
    ('operational' in e.correctAnswer && e.correctAnswer.operational === 'support') ||
    functionalZoneMapping.support.includes(e.id)
  )
  const networkElements = elements.filter(e => 
    ('operational' in e.correctAnswer && e.correctAnswer.operational === 'network') ||
    functionalZoneMapping.network.includes(e.id)
  )

  const renderOperationalGroup = (title: string, elements: DropZoneElement[]) => {
    // Find the operational zone element to get its assignment
    const operationalZoneElement = elements.find(e => e.type === 'operational-zone')
    const operationalAssignment = operationalZoneElement ? assignments.get(operationalZoneElement.id) : undefined
    
    // Get background and border colors based on assignment
    const getZoneBackgroundColor = () => {
      if (operationalAssignment?.operational && operationalAssignment.operational in OPERATIONAL_COLORS) {
        return OPERATIONAL_COLORS[operationalAssignment.operational as keyof typeof OPERATIONAL_COLORS].background
      }
      return DEFAULT_COLORS.background
    }
    
    const getZoneBorderColor = () => {
      if (operationalAssignment?.operational && operationalAssignment.operational in OPERATIONAL_COLORS) {
        return OPERATIONAL_COLORS[operationalAssignment.operational as keyof typeof OPERATIONAL_COLORS].border
      }
      return DEFAULT_COLORS.border
    }

    return (
      <Paper 
        p="md" 
        radius="md" 
        role="region"
        aria-label={`${title} containing operational and functional zones`}
        style={{ 
          border: `2px solid ${getZoneBorderColor()}`,
          backgroundColor: getZoneBackgroundColor(),
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Title order={4} mb="sm" c="black" ta="center" id={`zone-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {title}
        </Title>
        
        {/* Operational Zone Drop Area */}
        {operationalZoneElement && (
          <div style={{ marginBottom: '1rem' }} role="region" aria-label="Operational zone assignment area">
            <DropZone
              key={operationalZoneElement.id}
              id={operationalZoneElement.id}
              assignment={assignments.get(operationalZoneElement.id)}
              correctAnswer={operationalZoneElement.correctAnswer}
              onRemoveAssignment={onRemoveAssignment}
              onKeyboardAssign={() => handleKeyboardAssign(operationalZoneElement)}
              minHeight={60}
            >
              <div style={{ textAlign: 'center' }}>
                <Text fw={500} size="sm" c="black">
                  {operationalZoneElement.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {operationalZoneElement.description}
                </Text>
              </div>
            </DropZone>
          </div>
        )}

        {/* Functional Areas Grid */}
        <SimpleGrid 
          cols={2} 
          spacing="xs"
          role="group"
          aria-label="Functional zone assignment areas"
        >
          {elements
            .filter(element => element.type === 'functional-zone')
            .map(element => (
            <DropZone
              key={element.id}
              id={element.id}
              assignment={assignments.get(element.id)}
              correctAnswer={element.correctAnswer}
              onRemoveAssignment={onRemoveAssignment}
              onKeyboardAssign={() => handleKeyboardAssign(element)}
              minHeight={80}
            >
              <div>
                <Text fw={500} size="sm" c="black" component="h5">
                  {element.name}
                </Text>
                {element.description && (
                  <Text size="xs" c="dimmed" component="p">
                    {element.description}
                  </Text>
                )}
              </div>
            </DropZone>
          ))}
        </SimpleGrid>
      </Paper>
    )
  }

  return (
    <Stack gap="lg" role="region" aria-label="Factory system layout">
      <Title order={3} c="black" id="factory-layout-title" ta="center">
        Cookie Factory System Layout
      </Title>
      
      {/* Operational Zone 1 */}
      {externalElements.length > 0 && 
        renderOperationalGroup(
          'Operational Zone 1', 
          externalElements
        )
      }

      {/* Operational Zone 2 */}
      {manufacturingElements.length > 0 && 
        renderOperationalGroup(
          'Operational Zone 2', 
          manufacturingElements
        )
      }

      {/* Operational Zone 3 */}
      {supportElements.length > 0 && 
        renderOperationalGroup(
          'Operational Zone 3', 
          supportElements
        )
      }

      {/* Operational Zone 4 */}
      {networkElements.length > 0 && 
        renderOperationalGroup(
          'Operational Zone 4', 
          networkElements
        )
      }
      
      {/* Keyboard Assignment Modal */}
      <KeyboardAssignmentModal
        opened={modalOpened}
        onClose={closeModal}
        selectedElement={selectedElement?.id || null}
        elementName={selectedElement?.name || ''}
        elementDescription={selectedElement?.description || ''}
        onAssign={handleAssignmentFromModal}
        currentAssignment={selectedElement ? assignments.get(selectedElement.id) : undefined}
      />
    </Stack>
  )
}