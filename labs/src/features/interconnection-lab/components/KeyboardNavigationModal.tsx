import {
  Modal,
  Title,
  Text,
  Stack,
  Group,
  Paper,
  List,
  Divider,
  Kbd,
  Alert,
  ThemeIcon
} from '@mantine/core';
import {
  IconKeyboard,
  IconInfoCircle,
  IconAccessible
} from '@tabler/icons-react';

interface KeyboardNavigationModalProps {
  opened: boolean;
  onClose: () => void;
}

export function KeyboardNavigationModal({ opened, onClose }: KeyboardNavigationModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Keyboard Navigation & Accessibility Guide"
      size="lg"
      centered
    >
      <Stack gap="lg">
        {/* Introduction */}
        <Alert icon={<IconAccessible size={16} />} color="blue" variant="light">
          <Text fw={500} mb="xs">Fully Accessible Lab Experience</Text>
          <Text size="sm">
            This lab is designed to be fully accessible using keyboard navigation, screen readers,
            and assistive technologies. All interactive elements can be accessed without a mouse.
          </Text>
        </Alert>

        {/* Basic Navigation */}
        <Paper p="md" radius="md" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
          <Group gap="xs" mb="md">
            <ThemeIcon size="sm" color="blue" variant="light">
              <IconKeyboard size={16} />
            </ThemeIcon>
            <Title order={4}>Basic Keyboard Navigation</Title>
          </Group>
          
          <List spacing="sm">
            <List.Item>
              <Group gap="xs" align="center">
                <Kbd>Tab</Kbd>
                <Text size="sm">Move to next interactive element</Text>
              </Group>
            </List.Item>
            <List.Item>
              <Group gap="xs" align="center">
                <Kbd>Shift + Tab</Kbd>
                <Text size="sm">Move to previous interactive element</Text>
              </Group>
            </List.Item>
            <List.Item>
              <Group gap="xs" align="center">
                <Kbd>Enter</Kbd> / <Kbd>Space</Kbd>
                <Text size="sm">Activate buttons, open modals, select items</Text>
              </Group>
            </List.Item>
            <List.Item>
              <Group gap="xs" align="center">
                <Kbd>Arrow Keys</Kbd>
                <Text size="sm">Navigate within lists, radio groups, and tabs</Text>
              </Group>
            </List.Item>
            <List.Item>
              <Group gap="xs" align="center">
                <Kbd>Escape</Kbd>
                <Text size="sm">Close modals, cancel operations, exit modes</Text>
              </Group>
            </List.Item>
          </List>
        </Paper>

        {/* System Interaction */}
        <Paper p="md" radius="md" style={{ backgroundColor: '#e7f5ff', border: '1px solid #339af0' }}>
          <Title order={4} mb="md">Interacting with Factory Systems</Title>
          
          <Stack gap="md">
            <div>
              <Text fw={500} size="sm" mb="xs">Selecting Systems</Text>
              <List size="sm" spacing="xs">
                <List.Item>
                  Use <Kbd>Tab</Kbd> to navigate to systems in the visualization
                </List.Item>
                <List.Item>
                  Press <Kbd>Enter</Kbd> to select a system and view its details
                </List.Item>
                <List.Item>
                  Selected system information appears in the analysis panel
                </List.Item>
                <List.Item>
                  Use <Kbd>Escape</Kbd> to deselect the current system
                </List.Item>
              </List>
            </div>

            <div>
              <Text fw={500} size="sm" mb="xs">Creating Connections</Text>
              <List size="sm" spacing="xs">
                <List.Item>
                  Select a system, then press <Kbd>C</Kbd> to start connection mode
                </List.Item>
                <List.Item>
                  Navigate to the Connection Mapper panel using <Kbd>Tab</Kbd>
                </List.Item>
                <List.Item>
                  Fill out connection details using form controls
                </List.Item>
                <List.Item>
                  Press <Kbd>Enter</Kbd> on "Create Connection" to confirm
                </List.Item>
              </List>
            </div>
          </Stack>
        </Paper>

        {/* Panel Navigation */}
        <Paper p="md" radius="md" style={{ backgroundColor: '#f0f8f0', border: '1px solid #ccffcc' }}>
          <Title order={4} mb="md">Navigating Lab Panels</Title>
          
          <Stack gap="sm">
            <div>
              <Text fw={500} size="sm">Left Panel: Connection Mapper</Text>
              <Text size="xs" c="dimmed">
                Create and manage system connections, validate configurations
              </Text>
            </div>
            
            <div>
              <Text fw={500} size="sm">Center Panel: Factory Visualization</Text>
              <Text size="xs" c="dimmed">
                Interactive factory layout with all systems and connections
              </Text>
            </div>
            
            <div>
              <Text fw={500} size="sm">Right Panel: Analysis & Assessment</Text>
              <Text size="xs" c="dimmed">
                Two tabs: Analysis (dataflow/risk) and Assessment (quiz/validation)
              </Text>
            </div>
          </Stack>
        </Paper>

        {/* Assessment Navigation */}
        <Paper p="md" radius="md" style={{ backgroundColor: '#fff3e0', border: '1px solid #ffcc02' }}>
          <Title order={4} mb="md">Assessment & Quiz Navigation</Title>
          
          <List size="sm" spacing="sm">
            <List.Item>
              <strong>Multiple Choice:</strong> Use arrow keys to navigate options, <Kbd>Space</Kbd> to select
            </List.Item>
            <List.Item>
              <strong>Connection Validation:</strong> Press <Kbd>V</Kbd> or use "Validate" button
            </List.Item>
            <List.Item>
              <strong>Question Navigation:</strong> Use "Next" and "Previous" buttons with <Kbd>Enter</Kbd>
            </List.Item>
            <List.Item>
              <strong>Results Export:</strong> Navigate to export button and press <Kbd>Enter</Kbd>
            </List.Item>
          </List>
        </Paper>

        {/* Screen Reader Support */}
        <Paper p="md" radius="md" style={{ backgroundColor: '#f3e5f5', border: '1px solid #ce93d8' }}>
          <Title order={4} mb="md">Screen Reader Support</Title>
          
          <Stack gap="sm">
            <div>
              <Text fw={500} size="sm" mb="xs">Announcements</Text>
              <List size="xs" spacing="xs">
                <List.Item>System selection and deselection are announced</List.Item>
                <List.Item>Connection creation and validation results are announced</List.Item>
                <List.Item>Assessment progress and scores are announced</List.Item>
                <List.Item>Error messages and warnings are announced immediately</List.Item>
              </List>
            </div>

            <div>
              <Text fw={500} size="sm" mb="xs">Landmarks & Headings</Text>
              <List size="xs" spacing="xs">
                <List.Item>Proper heading hierarchy for easy navigation</List.Item>
                <List.Item>ARIA landmarks identify main content areas</List.Item>
                <List.Item>Form labels and descriptions are properly associated</List.Item>
                <List.Item>Live regions announce dynamic content changes</List.Item>
              </List>
            </div>
          </Stack>
        </Paper>

        {/* Quick Reference */}
        <Paper p="md" radius="md" style={{ backgroundColor: '#fff5f5', border: '1px solid #ffcccc' }}>
          <Title order={4} mb="md">Quick Keyboard Reference</Title>
          
          <Group grow>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="xs">Select system</Text>
                <Kbd size="xs">Tab → Enter</Kbd>
              </Group>
              <Group justify="space-between">
                <Text size="xs">Start connection</Text>
                <Kbd size="xs">C</Kbd>
              </Group>
              <Group justify="space-between">
                <Text size="xs">Validate connections</Text>
                <Kbd size="xs">V</Kbd>
              </Group>
              <Group justify="space-between">
                <Text size="xs">Reset lab</Text>
                <Kbd size="xs">R</Kbd>
              </Group>
            </Stack>
            
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="xs">Open tutorial</Text>
                <Kbd size="xs">H</Kbd>
              </Group>
              <Group justify="space-between">
                <Text size="xs">Toggle analysis</Text>
                <Kbd size="xs">A</Kbd>
              </Group>
              <Group justify="space-between">
                <Text size="xs">Next question</Text>
                <Kbd size="xs">N</Kbd>
              </Group>
              <Group justify="space-between">
                <Text size="xs">Previous question</Text>
                <Kbd size="xs">P</Kbd>
              </Group>
            </Stack>
          </Group>
        </Paper>

        <Divider />

        <Alert icon={<IconInfoCircle size={16} />} color="green" variant="light">
          <Text fw={500} mb="xs">Need Additional Help?</Text>
          <Text size="sm">
            If you encounter any accessibility issues or need additional accommodations,
            please contact your instructor. This lab is designed to work with all major
            screen readers including NVDA, JAWS, and VoiceOver.
          </Text>
        </Alert>
      </Stack>
    </Modal>
  );
}