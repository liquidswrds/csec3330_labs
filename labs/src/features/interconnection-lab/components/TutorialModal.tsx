import { useState } from 'react';
import {
  Modal,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Stepper,
  Paper,
  List,
  Badge,
  Alert,
  Divider,
  ThemeIcon
} from '@mantine/core';
import {
  IconInfoCircle,
  IconArrowRight,
  IconArrowLeft,
  IconCheck,
  IconBulb,
  IconTarget,
  IconShield,
  IconNetwork,
  IconChartBar
} from '@tabler/icons-react';

interface TutorialModalProps {
  opened: boolean;
  onClose: () => void;
  onStartLab?: () => void;
}

interface TutorialStep {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
}

export function TutorialModal({ opened, onClose, onStartLab }: TutorialModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  const tutorialSteps: TutorialStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to the Interconnection Lab',
      icon: <IconInfoCircle size={20} />,
      content: (
        <Stack gap="md">
          <Alert icon={<IconBulb size={16} />} color="blue" variant="light">
            <Text fw={500}>Learning Objectives</Text>
            <Text size="sm">
              In this lab, you'll learn to identify and analyze interconnections between industrial systems,
              understand data flows, and assess cybersecurity risks in a realistic cookie factory environment.
            </Text>
          </Alert>
          
          <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
            <Title order={5} mb="sm">What You'll Learn:</Title>
            <List spacing="sm" size="sm">
              <List.Item icon={<IconTarget size={16} />}>
                Map interconnections between industrial control systems
              </List.Item>
              <List.Item icon={<IconNetwork size={16} />}>
                Identify different types of connections and protocols
              </List.Item>
              <List.Item icon={<IconShield size={16} />}>
                Analyze security implications of system interconnections
              </List.Item>
              <List.Item icon={<IconChartBar size={16} />}>
                Assess data flows and potential attack vectors
              </List.Item>
            </List>
          </Paper>

          <Text size="sm" c="dimmed">
            <strong>Estimated Time:</strong> 45-60 minutes
          </Text>
          <Text size="sm" c="dimmed">
            <strong>Difficulty:</strong> Intermediate
          </Text>
        </Stack>
      )
    },
    {
      id: 'factory-overview',
      title: 'SweetTech Cookie Factory',
      icon: <IconInfoCircle size={20} />,
      content: (
        <Stack gap="md">
          <Paper p="md" style={{ backgroundColor: '#e7f5ff', border: '1px solid #339af0' }}>
            <Title order={5} mb="sm">Factory Overview</Title>
            <Text size="sm">
              SweetTech Cookie Manufacturing Company operates a modern automated facility
              with 24/7 production capabilities. The factory uses a mix of legacy and modern
              systems across multiple production lines.
            </Text>
          </Paper>

          <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
            <Title order={5} mb="sm">Key Systems Include:</Title>
            <List spacing="sm" size="sm">
              <List.Item>
                <Badge size="sm" color="green" mr="xs">Production</Badge>
                Recipe management, mixing controllers, baking ovens, packaging automation
              </List.Item>
              <List.Item>
                <Badge size="sm" color="blue" mr="xs">Support</Badge>
                Inventory management, HVAC, quality control, security cameras
              </List.Item>
              <List.Item>
                <Badge size="sm" color="orange" mr="xs">Business</Badge>
                ERP system, customer orders, supply chain, employee management
              </List.Item>
              <List.Item>
                <Badge size="sm" color="purple" mr="xs">Infrastructure</Badge>
                Network switches, firewalls, servers, wireless access points
              </List.Item>
            </List>
          </Paper>

          <Alert icon={<IconInfoCircle size={16} />} color="yellow" variant="light">
            <Text size="sm">
              Each system type has different criticality levels and security requirements.
              Understanding these relationships is key to effective cybersecurity.
            </Text>
          </Alert>
        </Stack>
      )
    },
    {
      id: 'visualization-guide',
      title: 'Using the Factory Visualization',
      icon: <IconNetwork size={20} />,
      content: (
        <Stack gap="md">
          <Text size="sm">
            The interactive factory layout shows all systems organized by their physical zones:
          </Text>

          <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
            <Stack gap="md">
              <Group align="flex-start">
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#e8f5e8', border: '1px dashed #ccc' }} />
                <div>
                  <Text fw={500} size="sm">Production Floor</Text>
                  <Text size="xs" c="dimmed">Manufacturing equipment and sensors</Text>
                </div>
              </Group>
              
              <Group align="flex-start">
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#e3f2fd', border: '1px dashed #ccc' }} />
                <div>
                  <Text fw={500} size="sm">Control Room</Text>
                  <Text size="xs" c="dimmed">Central monitoring and control systems</Text>
                </div>
              </Group>
              
              <Group align="flex-start">
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#fff3e0', border: '1px dashed #ccc' }} />
                <div>
                  <Text fw={500} size="sm">Server Room</Text>
                  <Text size="xs" c="dimmed">IT infrastructure and data storage</Text>
                </div>
              </Group>
              
              <Group align="flex-start">
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#f3e5f5', border: '1px dashed #ccc' }} />
                <div>
                  <Text fw={500} size="sm">Office Area</Text>
                  <Text size="xs" c="dimmed">Business systems and workstations</Text>
                </div>
              </Group>
            </Stack>
          </Paper>

          <Paper p="sm" style={{ backgroundColor: '#e7f5ff', border: '1px solid #339af0' }}>
            <Title order={6} mb="xs">Interaction Tips:</Title>
            <List size="xs" spacing="xs">
              <List.Item>Click systems to select and view details</List.Item>
              <List.Item>Double-click a system to start creating connections</List.Item>
              <List.Item>Use mouse wheel or zoom controls to navigate</List.Item>
              <List.Item>Drag to pan around the factory layout</List.Item>
            </List>
          </Paper>
        </Stack>
      )
    },
    {
      id: 'connection-types',
      title: 'Understanding Connection Types',
      icon: <IconNetwork size={20} />,
      content: (
        <Stack gap="md">
          <Text size="sm">
            Industrial systems use different types of connections for various purposes:
          </Text>

          <Stack gap="sm">
            <Paper p="sm" style={{ border: '1px solid #424242' }}>
              <Group align="flex-start">
                <div style={{ width: 20, height: 3, backgroundColor: '#424242' }} />
                <div>
                  <Text fw={500} size="sm">Physical Connection</Text>
                  <Text size="xs" c="dimmed">Direct cables, wires, and physical links</Text>
                  <Text size="xs" c="dimmed">Examples: Ethernet cables, serial connections</Text>
                </div>
              </Group>
            </Paper>

            <Paper p="sm" style={{ border: '1px solid #1976d2' }}>
              <Group align="flex-start">
                <div style={{ width: 20, height: 3, backgroundColor: '#1976d2', borderStyle: 'dashed' }} />
                <div>
                  <Text fw={500} size="sm">Network Connection</Text>
                  <Text size="xs" c="dimmed">IP-based network communication</Text>
                  <Text size="xs" c="dimmed">Examples: TCP/IP, HTTP/HTTPS, OPC UA</Text>
                </div>
              </Group>
            </Paper>

            <Paper p="sm" style={{ border: '1px solid #388e3c' }}>
              <Group align="flex-start">
                <div style={{ width: 20, height: 3, backgroundColor: '#388e3c', borderStyle: 'dotted' }} />
                <div>
                  <Text fw={500} size="sm">Wireless Connection</Text>
                  <Text size="xs" c="dimmed">Radio frequency communication</Text>
                  <Text size="xs" c="dimmed">Examples: WiFi, Bluetooth, cellular</Text>
                </div>
              </Group>
            </Paper>

            <Paper p="sm" style={{ border: '1px solid #f57c00' }}>
              <Group align="flex-start">
                <div style={{ width: 20, height: 3, backgroundColor: '#f57c00', borderStyle: 'solid' }} />
                <div>
                  <Text fw={500} size="sm">Logical Connection</Text>
                  <Text size="xs" c="dimmed">Data relationships and dependencies</Text>
                  <Text size="xs" c="dimmed">Examples: Database queries, API calls</Text>
                </div>
              </Group>
            </Paper>
          </Stack>

          <Alert icon={<IconShield size={16} />} color="orange" variant="light">
            <Text size="sm">
              Each connection type has different security implications. Physical connections
              are generally more secure but wireless connections are more vulnerable to interception.
            </Text>
          </Alert>
        </Stack>
      )
    },
    {
      id: 'security-analysis',
      title: 'Security Analysis Features',
      icon: <IconShield size={20} />,
      content: (
        <Stack gap="md">
          <Text size="sm">
            The lab includes comprehensive security analysis tools to help you understand
            cybersecurity implications of system interconnections:
          </Text>

          <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
            <Stack gap="md">
              <div>
                <Group gap="xs" mb="xs">
                  <ThemeIcon size="sm" color="blue" variant="light">
                    <IconChartBar size={12} />
                  </ThemeIcon>
                  <Text fw={500} size="sm">Risk Assessment</Text>
                </Group>
                <Text size="xs" c="dimmed">
                  Automated risk scoring based on system criticality, threats, and connection security
                </Text>
              </div>

              <div>
                <Group gap="xs" mb="xs">
                  <ThemeIcon size="sm" color="red" variant="light">
                    <IconShield size={12} />
                  </ThemeIcon>
                  <Text fw={500} size="sm">Threat Analysis</Text>
                </Group>
                <Text size="xs" c="dimmed">
                  Identification of potential security threats and attack vectors for each system
                </Text>
              </div>

              <div>
                <Group gap="xs" mb="xs">
                  <ThemeIcon size="sm" color="green" variant="light">
                    <IconNetwork size={12} />
                  </ThemeIcon>
                  <Text fw={500} size="sm">Data Flow Mapping</Text>
                </Group>
                <Text size="xs" c="dimmed">
                  Visualization of data flows and classification of information sensitivity
                </Text>
              </div>
            </Stack>
          </Paper>

          <Paper p="sm" style={{ backgroundColor: '#fff5f5', border: '1px solid #ffcccc' }}>
            <Text fw={500} size="sm" mb="xs">Critical Security Considerations:</Text>
            <List size="xs" spacing="xs">
              <List.Item>Network segmentation between IT and OT systems</List.Item>
              <List.Item>Encryption for sensitive data transmission</List.Item>
              <List.Item>Authentication and access control</List.Item>
              <List.Item>Monitoring and logging of system communications</List.Item>
            </List>
          </Paper>
        </Stack>
      )
    },
    {
      id: 'assessment-overview',
      title: 'Assessment and Validation',
      icon: <IconCheck size={20} />,
      content: (
        <Stack gap="md">
          <Text size="sm">
            Your understanding will be assessed through both practical connection mapping
            and theoretical knowledge questions:
          </Text>

          <Paper p="md" style={{ backgroundColor: '#e7f5ff', border: '1px solid #339af0' }}>
            <Stack gap="md">
              <div>
                <Text fw={500} size="sm" mb="xs">Connection Mapping (60% of grade)</Text>
                <List size="xs" spacing="xs">
                  <List.Item>Create connections between systems using correct protocols</List.Item>
                  <List.Item>Specify appropriate security levels for each connection</List.Item>
                  <List.Item>Identify data flow directions and characteristics</List.Item>
                </List>
              </div>

              <Divider />

              <div>
                <Text fw={500} size="sm" mb="xs">Knowledge Assessment (40% of grade)</Text>
                <List size="xs" spacing="xs">
                  <List.Item>Multiple choice questions on cybersecurity concepts</List.Item>
                  <List.Item>Scenario-based questions about threat analysis</List.Item>
                  <List.Item>Industrial protocol and security best practices</List.Item>
                </List>
              </div>
            </Stack>
          </Paper>

          <Paper p="sm" style={{ backgroundColor: '#f0f8f0', border: '1px solid #ccffcc' }}>
            <Text fw={500} size="sm" mb="xs">Grading Scale:</Text>
            <Group gap="md">
              <Badge color="green">90-100%: Excellent</Badge>
              <Badge color="blue">80-89%: Good</Badge>
              <Badge color="yellow">70-79%: Fair</Badge>
              <Badge color="red">Below 70%: Needs Improvement</Badge>
            </Group>
          </Paper>

          <Alert icon={<IconBulb size={16} />} color="blue" variant="light">
            <Text size="sm">
              <strong>Tip:</strong> Use the validation feature frequently to get feedback
              on your connections. This helps you learn the correct protocols and security
              configurations for different types of systems.
            </Text>
          </Alert>
        </Stack>
      )
    }
  ];

  const handleNext = () => {
    if (activeStep < tutorialSteps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleStartLab = () => {
    onStartLab?.();
    onClose();
  };

  const currentStep = tutorialSteps[activeStep];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Interconnection & Dataflow Analysis Lab Tutorial"
      size="lg"
      centered
    >
      <Stack gap="md">
        <Stepper
          active={activeStep}
          size="sm"
          completedIcon={<IconCheck size={16} />}
          allowNextStepsSelect={false}
        >
          {tutorialSteps.map((step, index) => (
            <Stepper.Step
              key={step.id}
              label={step.title}
              icon={step.icon}
              loading={activeStep === index}
            />
          ))}
        </Stepper>

        <Paper p="lg" style={{ minHeight: 400, backgroundColor: '#fafafa' }}>
          <Stack gap="md">
            <Group align="center">
              <ThemeIcon size="lg" color="blue" variant="light">
                {currentStep.icon}
              </ThemeIcon>
              <Title order={4}>{currentStep.title}</Title>
            </Group>
            
            <div>{currentStep.content}</div>
          </Stack>
        </Paper>

        <Group justify="space-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            leftSection={<IconArrowLeft size={16} />}
            disabled={activeStep === 0}
          >
            Previous
          </Button>

          <Text size="sm" c="dimmed">
            {activeStep + 1} of {tutorialSteps.length}
          </Text>

          {activeStep === tutorialSteps.length - 1 ? (
            <Button
              onClick={handleStartLab}
              leftSection={<IconCheck size={16} />}
              color="green"
            >
              Start Lab
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              rightSection={<IconArrowRight size={16} />}
            >
              Next
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}