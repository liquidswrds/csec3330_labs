import { Paper, Title, Text, Stack, SimpleGrid, Box } from '@mantine/core'
import { DropZone } from './DropZone'
import { Assignment, DropZoneElement } from '../types'
import { OPERATIONAL_COLORS, DEFAULT_COLORS } from '../utils/colors'

interface FactoryLayoutProps {
  elements: DropZoneElement[]
  assignments: Map<string, Assignment>
  onRemoveAssignment: (elementId: string, assignmentType: 'functional' | 'operational') => void
}

export function FactoryLayout({ elements, assignments, onRemoveAssignment }: FactoryLayoutProps) {
  // Group elements by operational area for layout
  const externalElements = elements.filter(e => e.correctAnswer.operational === 'external')
  const manufacturingElements = elements.filter(e => e.correctAnswer.operational === 'manufacturing')
  const supportElements = elements.filter(e => e.correctAnswer.operational === 'support')
  const networkElements = elements.filter(e => e.correctAnswer.operational === 'network')

  // Function to get group styling based on operational assignment
  const getGroupStyle = (zoneId: string) => {
    const assignment = assignments.get(zoneId)
    if (assignment?.operational && assignment.operational in OPERATIONAL_COLORS) {
      const colors = OPERATIONAL_COLORS[assignment.operational as keyof typeof OPERATIONAL_COLORS]
      return { backgroundColor: colors.background, borderColor: colors.border }
    }
    return { backgroundColor: DEFAULT_COLORS.background, borderColor: DEFAULT_COLORS.border }
  }

  const OperationalDropZone = ({ zoneId, title, description }: { zoneId: string; title: string; description: string }) => {
    const zone = elements.find(e => e.id === zoneId)
    if (!zone) return null

    const assignment = assignments.get(zoneId)

    return (
      <Box mb="md">
        <DropZone
          id={zoneId}
          assignment={assignment}
          correctAnswer={zone.correctAnswer}
          onRemoveAssignment={onRemoveAssignment}
          minHeight={80}
        >
          <Stack align="center" gap="xs">
            <Text fw={700} size="lg" c="black">
              {title}
            </Text>
            <Text size="sm" c="black" fs="italic">
              {description}
            </Text>
            
            {/* Operational area indicator */}
            <>
              <Box 
                w={40} 
                h={4} 
                bg="green.2" 
                style={{ borderRadius: '2px', opacity: 0.8 }} 
              />
              <Text size="xs" c="green.6" fw={500} ta="center" fs="italic">
                Drag label here
              </Text>
            </>

            {/* Show functional assignment status with correct/incorrect feedback */}
            {assignment?.functional && (
              (() => {
                const assignedFunctional = assignment.functional;
                const correctFunctional = zone.correctAnswer.functional;
                const isCorrect = assignedFunctional === correctFunctional;
                
                return (
                  <Text size="xs" c={isCorrect ? "green.7" : "red.7"} fw={600} ta="center">
                    {isCorrect ? "✓" : "✗"} Functional: {assignedFunctional}
                  </Text>
                );
              })()
            )}
          </Stack>
        </DropZone>
      </Box>
    )
  }


  return (
    <Paper p="md" radius="md" withBorder style={{ marginBottom: '2rem' }}>
      <Stack gap="xl">
        <Title order={2} ta="center" c="black">
          Cookie Factory System Layout
        </Title>
        <Text ta="center" c="black">
          Identify operational areas by dragging orange labels to the drop zones, then assign functional areas to each component.
        </Text>

        {/* External Operations Group */}
        <Box>
          <Paper 
            p="lg" 
            withBorder 
            radius="md" 
            style={getGroupStyle('external-ops-zone')}
          >
            <OperationalDropZone 
              zoneId="external-ops-zone"
              title="Operations Group 1"
              description="What type of operational area is this? (Drag label here)"
            />
            <Text size="sm" c="dimmed" mb="md" ta="center">
              Systems and organizations outside the factory boundaries
            </Text>
            {/* External Functional Areas */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {externalElements
                .filter(e => e.type === 'functional-zone')
                .map(element => (
                  <Box key={element.id}>
                    <DropZone
                      id={element.id}
                      assignment={assignments.get(element.id)}
                      correctAnswer={element.correctAnswer}
                      onRemoveAssignment={onRemoveAssignment}
                      minHeight={120}
                    >
                      <Stack gap="sm" align="center" h="100%" justify="center" p="md">
                        <Title order={5} c="black" ta="center">
                          {element.name}
                        </Title>
                        <Text size="xs" ta="center" fs="italic" style={{ color: '#40c057' }}>
                          {element.description}
                        </Text>
                        
                        {/* Visual indicator for functional area assignment */}
                        <Box 
                          w={30} 
                          h={4} 
                          style={{ backgroundColor: '#b2f2bb', borderRadius: '2px', opacity: 0.8 }} 
                        />
                        
                        {/* Component list */}
                        <Box w="100%" p="xs" bg="gray.0" style={{ borderRadius: '4px' }}>
                          <Text size="xs" c="dimmed" ta="center" mb="xs">Components:</Text>
                          {element.id === 'flour-supplier' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Bulk ingredient suppliers with EDI ordering</Text>
                            </Stack>
                          )}
                          {element.id === 'packaging-supplier' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Film, boxes, labels with RFID tracking</Text>
                            </Stack>
                          )}
                          {element.id === 'quality-lab' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Third-party microbiological testing</Text>
                            </Stack>
                          )}
                          {element.id === 'distributors' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Temperature-controlled logistics network</Text>
                            </Stack>
                          )}
                          {element.id === 'regulatory-agency' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• FDA/USDA inspection and compliance</Text>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
                    </DropZone>
                  </Box>
                ))
              }
            </SimpleGrid>
          </Paper>
        </Box>

        {/* Manufacturing Operations Group */}
        <Box>
          <Paper 
            p="lg" 
            withBorder 
            radius="md" 
            style={getGroupStyle('manufacturing-ops-zone')}
          >
            <OperationalDropZone 
              zoneId="manufacturing-ops-zone"
              title="Operations Group 2"
              description="What type of operational area is this? (Drag label here)"
            />
            <Text size="sm" c="dimmed" mb="md" ta="center">
              Direct production processes from ingredients to packaged cookies
            </Text>
            
            {/* Manufacturing Functional Areas */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
              {manufacturingElements
                .filter(e => e.type === 'functional-zone')
                .map(element => (
                  <Box key={element.id}>
                    <DropZone
                      id={element.id}
                      assignment={assignments.get(element.id)}
                      correctAnswer={element.correctAnswer}
                      onRemoveAssignment={onRemoveAssignment}
                      minHeight={120}
                    >
                      <Stack gap="sm" align="center" h="100%" justify="center" p="md">
                        <Title order={5} c="black" ta="center">
                          {element.name}
                        </Title>
                        <Text size="xs" ta="center" fs="italic" style={{ color: '#40c057' }}>
                          {element.description}
                        </Text>
                        
                        {/* Visual indicator for functional area assignment */}
                        <Box 
                          w={30} 
                          h={4} 
                          style={{ backgroundColor: '#b2f2bb', borderRadius: '2px', opacity: 0.8 }} 
                        />
                        
                        {/* Component list */}
                        <Box w="100%" p="xs" bg="gray.0" style={{ borderRadius: '4px' }}>
                          <Text size="xs" c="dimmed" ta="center" mb="xs">Components:</Text>
                          {element.id === 'ingredient-preparation-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Flour Storage Silos</Text>
                              <Text size="xs" c="black">• Automated Weighing Systems</Text>
                              <Text size="xs" c="black">• Ingredient Moisture Sensors</Text>
                            </Stack>
                          )}
                          {element.id === 'mixing-recipe-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Industrial Dough Mixers</Text>
                              <Text size="xs" c="black">• Recipe Management System</Text>
                              <Text size="xs" c="black">• Mixing Time & Speed Monitors</Text>
                            </Stack>
                          )}
                          {element.id === 'cookie-forming-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Cookie Forming Machines</Text>
                              <Text size="xs" c="black">• Shape Quality Cameras</Text>
                            </Stack>
                          )}
                          {element.id === 'baking-operations-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Continuous Tunnel Ovens</Text>
                              <Text size="xs" c="black">• Oven Temperature Control</Text>
                              <Text size="xs" c="black">• Multi-Zone Temperature Sensors</Text>
                              <Text size="xs" c="black">• Conveyor Speed Monitors</Text>
                            </Stack>
                          )}
                          {element.id === 'cooling-systems-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Cooling Conveyor Systems</Text>
                              <Text size="xs" c="black">• Industrial Cooling Fans</Text>
                            </Stack>
                          )}
                          {element.id === 'packaging-finishing-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Cookie Wrapping Machines</Text>
                              <Text size="xs" c="black">• Automated Boxing Systems</Text>
                              <Text size="xs" c="black">• Package Weight Verification</Text>
                              <Text size="xs" c="black">• Date/Lot Code Printers</Text>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
                    </DropZone>
                  </Box>
                ))
              }
            </SimpleGrid>
          </Paper>
        </Box>

        {/* Support Operations Group */}
        <Box>
          <Paper 
            p="lg" 
            withBorder 
            radius="md" 
            style={getGroupStyle('support-ops-zone')}
          >
            <OperationalDropZone 
              zoneId="support-ops-zone"
              title="Operations Group 3"
              description="What type of operational area is this? (Drag label here)"
            />
            <Text size="sm" c="dimmed" mb="md" ta="center">
              Systems that support production but don't directly make cookies
            </Text>
            
            {/* Support Functional Areas */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
              {supportElements
                .filter(e => e.type === 'functional-zone')
                .map(element => (
                  <Box key={element.id}>
                    <DropZone
                      id={element.id}
                      assignment={assignments.get(element.id)}
                      correctAnswer={element.correctAnswer}
                      onRemoveAssignment={onRemoveAssignment}
                      minHeight={120}
                    >
                      <Stack gap="sm" align="center" h="100%" justify="center" p="md">
                        <Title order={5} c="black" ta="center">
                          {element.name}
                        </Title>
                        <Text size="xs" ta="center" fs="italic" style={{ color: '#40c057' }}>
                          {element.description}
                        </Text>
                        
                        {/* Visual indicator for functional area assignment */}
                        <Box 
                          w={30} 
                          h={4} 
                          style={{ backgroundColor: '#b2f2bb', borderRadius: '2px', opacity: 0.8 }} 
                        />
                        
                        {/* Component list */}
                        <Box w="100%" p="xs" bg="gray.0" style={{ borderRadius: '4px' }}>
                          <Text size="xs" c="dimmed" ta="center" mb="xs">Components:</Text>
                          {element.id === 'process-control-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Central Control Room</Text>
                              <Text size="xs" c="black">• Operator HMI Stations</Text>
                              <Text size="xs" c="black">• SCADA System</Text>
                              <Text size="xs" c="black">• Production Database Server</Text>
                            </Stack>
                          )}
                          {element.id === 'quality-assurance-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• On-Site Quality Lab</Text>
                              <Text size="xs" c="black">• Testing Equipment</Text>
                              <Text size="xs" c="black">• Sample Tracking System</Text>
                            </Stack>
                          )}
                          {element.id === 'maintenance-operations-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Maintenance Workshop</Text>
                              <Text size="xs" c="black">• Spare Parts Inventory</Text>
                              <Text size="xs" c="black">• Equipment Maintenance Database</Text>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
                    </DropZone>
                  </Box>
                ))
              }
            </SimpleGrid>
          </Paper>
        </Box>

        {/* Network Operations Group */}
        <Box>
          <Paper 
            p="lg" 
            withBorder 
            radius="md" 
            style={getGroupStyle('network-ops-zone')}
          >
            <OperationalDropZone 
              zoneId="network-ops-zone"
              title="Operations Group 4"
              description="What type of operational area is this? (Drag label here)"
            />
            <Text size="sm" c="dimmed" mb="md" ta="center">
              IT infrastructure and communication systems
            </Text>
            
            {/* Network Functional Areas */}
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {networkElements
                .filter(e => e.type === 'functional-zone')
                .map(element => (
                  <Box key={element.id}>
                    <DropZone
                      id={element.id}
                      assignment={assignments.get(element.id)}
                      correctAnswer={element.correctAnswer}
                      onRemoveAssignment={onRemoveAssignment}
                      minHeight={120}
                    >
                      <Stack gap="sm" align="center" h="100%" justify="center" p="md">
                        <Title order={5} c="black" ta="center">
                          {element.name}
                        </Title>
                        <Text size="xs" ta="center" fs="italic" style={{ color: '#40c057' }}>
                          {element.description}
                        </Text>
                        
                        {/* Visual indicator for functional area assignment */}
                        <Box 
                          w={30} 
                          h={4} 
                          style={{ backgroundColor: '#b2f2bb', borderRadius: '2px', opacity: 0.8 }} 
                        />
                        
                        {/* Component list */}
                        <Box w="100%" p="xs" bg="gray.0" style={{ borderRadius: '4px' }}>
                          <Text size="xs" c="dimmed" ta="center" mb="xs">Components:</Text>
                          {element.id === 'data-center-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• Data Center/Server Room</Text>
                              <Text size="xs" c="black">• Network Security Firewalls</Text>
                              <Text size="xs" c="black">• Industrial Network Switches</Text>
                            </Stack>
                          )}
                          {element.id === 'network-infrastructure-functional-zone' && (
                            <Stack gap={2}>
                              <Text size="xs" c="black">• OT Production Network</Text>
                              <Text size="xs" c="black">• IT Corporate Network</Text>
                              <Text size="xs" c="black">• Wireless Network Infrastructure</Text>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
                    </DropZone>
                  </Box>
                ))
              }
            </SimpleGrid>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  )
}