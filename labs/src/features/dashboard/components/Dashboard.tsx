import { 
  Container, 
  Title, 
  Text, 
  Card, 
  Group, 
  Stack, 
  Button, 
  Badge,
  Paper,
  ThemeIcon,
  Divider,
  Grid
} from '@mantine/core'
import { IconShield, IconSettings, IconArrowRight, IconBook } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { BRAND_COLORS, THEME_STYLES } from '../../../shared/constants/theme'

const labs = [
  {
    id: '1.1',
    title: 'System Boundary Lab 1.1',
    subtitle: 'Operational vs Functional Areas',
    description: 'Learn to identify and classify system boundaries between operational and functional areas in a cookie factory environment.',
    status: 'Available',
    route: '/lab/1.1',
    difficulty: 'Beginner',
    estimatedTime: '30-45 minutes',
    topics: ['System Boundaries', 'Operational Areas', 'Functional Areas', 'Cybersecurity Fundamentals']
  }
]

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <div 
      style={{ 
        background: THEME_STYLES.gradients.background,
        minHeight: '100vh',
        padding: '2rem 0'
      }}
      role="main"
      aria-label="Cybersecurity labs dashboard"
    >
      <Container size="xl">
        <Stack gap="xl" role="document">
          {/* Header Section */}
          <Paper
            p="xl"
            radius="lg"
            role="banner"
            style={{
              background: THEME_STYLES.gradients.primary(BRAND_COLORS.primary),
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Group align="center" gap="md" mb="md">
              <ThemeIcon
                size={60}
                radius="md"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}
                aria-hidden="true"
              >
                <IconShield size={32} />
              </ThemeIcon>
              <div>
                <Title order={1} size="h1" fw={700} mb={4} id="dashboard-title">
                  CSEC 3330 Industrial System Security
                </Title>
                <Text size="lg" opacity={0.9}>
                  Interactive learning modules for cybersecurity concepts
                </Text>
              </div>
            </Group>
            <Text size="md" opacity={0.8} maw={800}>
              Welcome to the cybersecurity lab dashboard. Each module contains hands-on exercises 
              designed to help you understand fundamental cybersecurity concepts through interactive 
              simulations and real-world scenarios.
            </Text>
          </Paper>

          {/* Module 1 Section */}
          <section role="region" aria-labelledby="module-1-title">
            <Group align="center" mb="lg">
              <Title order={2} c={BRAND_COLORS.primary} fw={600} id="module-1-title">
                Module 1: System Boundaries & System Lifecycle
              </Title>
              <Badge 
                size="md" 
                color="gray"
                style={{ 
                  backgroundColor: BRAND_COLORS.secondary,
                  color: 'white'
                }}
              >
                {labs.length} Lab{labs.length !== 1 ? 's' : ''} Available
              </Badge>
            </Group>

            <Grid role="list">
              {labs.map((lab) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={lab.id} role="listitem">
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="lg"
                    withBorder
                    role="article"
                    aria-labelledby={`lab-title-${lab.id}`}
                    tabIndex={0}
                    style={{
                      height: '100%',
                      transition: 'all 0.2s ease',
                      border: `1px solid ${BRAND_COLORS.secondary}40`,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      ':hover': {
                        transform: THEME_STYLES.shadows.hover,
                        boxShadow: THEME_STYLES.shadows.card
                      },
                      ':focus-visible': {
                        outline: '3px solid #005fcc',
                        outlineOffset: '2px'
                      }
                    }}
                  >
                    <Stack gap="md" style={{ height: '100%' }}>
                      {/* Lab Header */}
                      <Group align="center" gap="xs">
                        <ThemeIcon
                          size="md"
                          radius="md"
                          style={{ backgroundColor: BRAND_COLORS.primary }}
                          aria-hidden="true"
                        >
                          <IconBook size={16} />
                        </ThemeIcon>
                        <Text fw={600} c={BRAND_COLORS.primary} component="h3" id={`lab-title-${lab.id}`}>
                          {lab.title}
                        </Text>
                      </Group>

                      <Text fw={500} size="md" c="dark" component="h4">
                        {lab.subtitle}
                      </Text>

                      <Text size="sm" c="dimmed" style={{ flex: 1 }} component="p">
                        {lab.description}
                      </Text>

                      <Divider />

                      {/* Lab Details */}
                      <Stack gap="xs">
                        <Group justify="space-between">
                          <Text size="xs" c="dimmed">Difficulty:</Text>
                          <Badge size="xs" color="green" variant="light">
                            {lab.difficulty}
                          </Badge>
                        </Group>
                        <Group justify="space-between">
                          <Text size="xs" c="dimmed">Time:</Text>
                          <Text size="xs" fw={500}>
                            {lab.estimatedTime}
                          </Text>
                        </Group>
                      </Stack>

                      {/* Topics */}
                      <div>
                        <Text size="xs" c="dimmed" mb={4}>Topics:</Text>
                        <Group gap={4}>
                          {lab.topics.slice(0, 2).map((topic) => (
                            <Badge 
                              key={topic} 
                              size="xs" 
                              variant="outline" 
                              color="gray"
                              style={{ 
                                borderColor: BRAND_COLORS.secondary,
                                color: BRAND_COLORS.secondary
                              }}
                            >
                              {topic}
                            </Badge>
                          ))}
                          {lab.topics.length > 2 && (
                            <Badge size="xs" variant="outline" color="gray">
                              +{lab.topics.length - 2} more
                            </Badge>
                          )}
                        </Group>
                      </div>

                      {/* Action Button */}
                      <Button
                        fullWidth
                        rightSection={<IconArrowRight size={16} aria-hidden="true" />}
                        style={{
                          backgroundColor: BRAND_COLORS.primary,
                          ':hover': {
                            backgroundColor: '#003d52'
                          }
                        }}
                        onClick={() => navigate(lab.route)}
                        mt="auto"
                        aria-describedby={`lab-title-${lab.id}`}
                      >
                        Start Lab
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}

              {/* Coming Soon Card */}
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }} role="listitem">
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="lg"
                  withBorder
                  role="article"
                  aria-label="Coming soon: Module 1.2"
                  style={{
                    height: '100%',
                    border: `1px dashed ${BRAND_COLORS.secondary}60`,
                    backgroundColor: '#fafafa',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Stack gap="md" align="center" justify="center" style={{ height: '100%', minHeight: 200 }}>
                    <ThemeIcon
                      size={48}
                      radius="md"
                      style={{ 
                        backgroundColor: BRAND_COLORS.secondary,
                        opacity: 0.7
                      }}
                      aria-hidden="true"
                    >
                      <IconSettings size={24} />
                    </ThemeIcon>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={600} c={BRAND_COLORS.secondary} mb={4}>
                        Module 1.2 Coming Soon
                      </Text>
                      <Text size="sm" c="dimmed">
                        Additional labs will be added throughout the semester
                      </Text>
                    </div>
                    <Badge color="gray" variant="outline">
                      In Development
                    </Badge>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </section>

          {/* Future Modules Section */}
          <Paper 
            p="md" 
            radius="md" 
            role="complementary" 
            aria-label="Information about future modules"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Text size="sm" c="dimmed" ta="center" component="p">
              <strong>Coming Later:</strong> Module 2 (Network Security), Module 3 (Cryptography), 
              Module 4 (Incident Response), and more cybersecurity fundamentals
            </Text>
          </Paper>
        </Stack>
      </Container>
    </div>
  )
}