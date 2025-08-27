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
            <Text fw={700} size="lg" c="gray.7">
              {title}
            </Text>
            <Text size="sm" c="dimmed" fs="italic">
              {description}
            </Text>
            
            {/* Functional area dropzone indicator */}
            {zone.correctAnswer.functional && !assignment?.functional && (
              <>
                <Box 
                  w={40} 
                  h={4} 
                  bg="green.2" 
                  style={{ borderRadius: '2px', opacity: 0.8 }} 
                />
                <Text size="xs" c="green.6" fw={500} ta="center" fs="italic">
                  Also drag functional area here
                </Text>
              </>
            )}

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

  const renderElementGrid = (sectionElements: DropZoneElement[], cols: any = { base: 1, sm: 2, lg: 3 }) => (
    <SimpleGrid cols={cols} spacing="md">
      {sectionElements
        .filter(e => e.type !== 'operational-zone')
        .map(element => (
          <DropZone
            key={element.id}
            id={element.id}
            assignment={assignments.get(element.id)}
            correctAnswer={element.correctAnswer}
            onRemoveAssignment={onRemoveAssignment}
            minHeight={element.type === 'area' ? 140 : 100}
          >
            <Stack gap="xs" align="center" h="100%" justify="center">
              <Text fw={600} size="sm" ta="center" c="dark.7">
                {element.name}
              </Text>
              {element.description && (
                <Text size="xs" c="dimmed" ta="center" px="xs">
                  {element.description}
                </Text>
              )}
              {/* Visual indicator that this accepts functional assignments */}
              {element.correctAnswer.functional && !assignments.get(element.id)?.functional && (
                <>
                  <Box 
                    w={30} 
                    h={4} 
                    bg="green.2" 
                    style={{ borderRadius: '2px', opacity: 0.8 }} 
                  />
                  <Text size="xs" c="green.6" fw={500} ta="center" fs="italic">
                    Drop functional area here
                  </Text>
                </>
              )}
              {/* Show assigned functional area with correct/incorrect feedback */}
              {assignments.get(element.id)?.functional && (
                (() => {
                  const assignedFunctional = assignments.get(element.id)?.functional;
                  const correctFunctional = element.correctAnswer.functional;
                  const isCorrect = assignedFunctional === correctFunctional;
                  
                  return (
                    <Text size="xs" c={isCorrect ? "green.7" : "red.7"} fw={600} ta="center">
                      {isCorrect ? "✓" : "✗"} {assignedFunctional}
                    </Text>
                  );
                })()
              )}
            </Stack>
          </DropZone>
        ))
      }
    </SimpleGrid>
  )

  return (
    <Paper p="md" radius="md" withBorder style={{ marginBottom: '2rem' }}>
      <Stack gap="xl">
        <Title order={2} ta="center" c="dark">
          Cookie Factory System Layout
        </Title>
        <Text ta="center" c="dimmed">
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
            {renderElementGrid(externalElements, { base: 1, sm: 2, md: 3 })}
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
            
            {/* Production Flow Areas */}
            <Stack gap="lg">
              {/* Ingredient Prep */}
              <Box>
                <Title order={5} c="blue.7" mb="sm">Ingredient Preparation</Title>
                {renderElementGrid(
                  manufacturingElements.filter(e => 
                    ['ingredient-prep-area', 'flour-silos', 'ingredient-scales', 'moisture-sensors'].includes(e.id)
                  ),
                  { base: 1, sm: 2, md: 4 }
                )}
              </Box>

              {/* Mixing */}
              <Box>
                <Title order={5} c="blue.7" mb="sm">Mixing & Recipe Control</Title>
                {renderElementGrid(
                  manufacturingElements.filter(e => 
                    ['mixing-area', 'industrial-mixers', 'recipe-control', 'mixing-sensors'].includes(e.id)
                  ),
                  { base: 1, sm: 2, md: 4 }
                )}
              </Box>

              {/* Forming */}
              <Box>
                <Title order={5} c="blue.7" mb="sm">Cookie Forming</Title>
                {renderElementGrid(
                  manufacturingElements.filter(e => 
                    ['forming-area', 'forming-machines', 'shape-inspection'].includes(e.id)
                  ),
                  { base: 1, sm: 3 }
                )}
              </Box>

              {/* Baking */}
              <Box>
                <Title order={5} c="blue.7" mb="sm">Baking Operations</Title>
                {renderElementGrid(
                  manufacturingElements.filter(e => 
                    ['baking-area', 'tunnel-ovens', 'oven-controls', 'temperature-monitoring', 'conveyor-sensors'].includes(e.id)
                  ),
                  { base: 1, sm: 2, md: 3 }
                )}
              </Box>

              {/* Cooling */}
              <Box>
                <Title order={5} c="blue.7" mb="sm">Cooling Systems</Title>
                {renderElementGrid(
                  manufacturingElements.filter(e => 
                    ['cooling-area', 'cooling-conveyors', 'cooling-fans'].includes(e.id)
                  ),
                  { base: 1, sm: 3 }
                )}
              </Box>

              {/* Packaging */}
              <Box>
                <Title order={5} c="blue.7" mb="sm">Packaging & Finishing</Title>
                {renderElementGrid(
                  manufacturingElements.filter(e => 
                    ['packaging-area', 'wrapping-machines', 'boxing-machines', 'weight-checkers', 'date-coding'].includes(e.id)
                  ),
                  { base: 1, sm: 2, md: 3 }
                )}
              </Box>
            </Stack>
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
            
            <Stack gap="lg">
              {/* Control Systems */}
              <Box>
                <Title order={5} c="purple.7" mb="sm">Process Control Center</Title>
                {renderElementGrid(
                  supportElements.filter(e => 
                    ['control-room', 'hmi-stations', 'scada-system', 'production-database'].includes(e.id)
                  ),
                  { base: 1, sm: 2, md: 4 }
                )}
              </Box>

              {/* Quality Lab */}
              <Box>
                <Title order={5} c="purple.7" mb="sm">Quality Assurance Lab</Title>
                {renderElementGrid(
                  supportElements.filter(e => 
                    ['quality-lab-internal', 'lab-equipment', 'sample-tracking'].includes(e.id)
                  ),
                  { base: 1, sm: 3 }
                )}
              </Box>

              {/* Maintenance */}
              <Box>
                <Title order={5} c="purple.7" mb="sm">Maintenance Operations</Title>
                {renderElementGrid(
                  supportElements.filter(e => 
                    ['maintenance-shop', 'spare-parts', 'cmms'].includes(e.id)
                  ),
                  { base: 1, sm: 3 }
                )}
              </Box>
            </Stack>
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
            
            <Stack gap="lg">
              {/* Data Center */}
              <Box>
                <Title order={5} c="orange.7" mb="sm">Data Center Infrastructure</Title>
                {renderElementGrid(
                  networkElements.filter(e => 
                    ['server-room', 'firewall-systems', 'network-switches'].includes(e.id)
                  ),
                  { base: 1, sm: 3 }
                )}
              </Box>

              {/* Networks */}
              <Box>
                <Title order={5} c="orange.7" mb="sm">Network Infrastructure</Title>
                {renderElementGrid(
                  networkElements.filter(e => 
                    ['ot-network', 'it-network', 'wireless-network'].includes(e.id)
                  ),
                  { base: 1, sm: 3 }
                )}
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  )
}