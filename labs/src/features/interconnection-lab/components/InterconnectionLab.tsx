import { useState, useEffect } from 'react';
import {
  AppShell,
  Title,
  Text,
  Button,
  Container,
  Group,
  Stack,
  ActionIcon,
  Tabs,
  Paper,
  Badge,
  Alert
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconHelp, IconBulb, IconKeyboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { FactoryVisualization } from './FactoryVisualization';
import { ConnectionMapper } from './ConnectionMapper';
import { DataflowAnalysisPanel } from './DataflowAnalysisPanel';
import { AssessmentPanel } from './AssessmentPanel';
import { TutorialModal } from './TutorialModal';
import { useInterconnectionLabState } from '../hooks/useInterconnectionLabState';

// Enhanced styles for accessibility and layout
const labStyles = `
  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: ButtonText !important;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* Focus indication */
  *:focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  /* Custom scrollbars */
  .lab-scroll::-webkit-scrollbar {
    width: 8px;
  }
  .lab-scroll::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
  }
  .lab-scroll::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 4px;
  }
  .lab-scroll::-webkit-scrollbar-thumb:hover {
    background: #9e9e9e;
  }
  
  /* Prevent horizontal scrolling during interactions */
  body.lab-active {
    overflow-x: hidden !important;
  }
  
  html, body {
    overflow-x: hidden;
    position: relative;
    height: 100%;
  }
  
  /* Sticky panels */
  .lab-panel {
    position: sticky !important;
    top: 20px !important;
    height: fit-content !important;
    max-height: calc(100vh - 140px) !important;
    overflow-y: auto !important;
    scrollbar-width: thin;
    scrollbar-color: #757575 #fafafa;
  }
  
  /* Visualization area */
  .lab-visualization {
    height: calc(100vh - 140px);
    overflow: hidden;
  }
`;

export function InterconnectionLab() {
  const navigate = useNavigate();
  const [tutorialOpened, { open: openTutorial, close: closeTutorial }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [, setShowKeyboardHelp] = useState(false);

  const {
    // State
    systems,
    connections,
    selectedSystem,
    selectedConnection,
    hoveredSystem,
    showDataflows,
    showThreats,
    isConnecting,
    connectionStart,
    progress,
    validationResults,

    // Handlers
    handleSystemClick,
    handleSystemHover,
    handleStartConnection,
    handleCompleteConnection,
    handleCancelConnection,
    handleCreateConnection,
    handleDeleteConnection,
    handleConnectionClick,
    handleToggleDataflows,
    handleToggleThreats,
    validateConnections,
    analyzeSystem,
    resetLab
  } = useInterconnectionLabState();

  // Add body class for layout control
  useEffect(() => {
    document.body.classList.add('lab-active');
    return () => document.body.classList.remove('lab-active');
  }, []);

  // Keyboard accessibility handler
  const handleKeyboardAssign = () => {
    setShowKeyboardHelp(true);
    // This would open a modal for keyboard-based system connection creation
  };

  // Export results handler
  const handleExportResults = () => {
    const results = {
      timestamp: new Date().toISOString(),
      progress,
      connections: connections.filter(c => c.userCreated),
      validationResults: Array.from(validationResults.entries()),
      systems: systems.length,
      score: progress.assessmentScore
    };

    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `interconnection-lab-results-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getProgressColor = () => {
    const score = progress.assessmentScore;
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'yellow';
    return 'red';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: labStyles }} />
      <AppShell
        padding="md"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Container size="xl" style={{ height: '100%' }}>
          <Stack gap="lg" style={{ height: '100%' }}>
            {/* Header */}
            <Group justify="space-between" align="center">
              <Group gap="md">
                <ActionIcon 
                  variant="light" 
                  size="lg" 
                  onClick={() => navigate('/')}
                  aria-label="Go back to dashboard"
                  title="Return to dashboard"
                >
                  <IconArrowLeft size={18} aria-hidden="true" />
                </ActionIcon>
                <div>
                  <Title order={1} size="h2" id="lab-title">
                    Interconnection & Dataflow Analysis Lab
                  </Title>
                  <Text size="lg" c="dimmed" id="lab-description">
                    SweetTech Cookie Factory System Analysis
                  </Text>
                </div>
              </Group>

              <Group gap="sm">
                <Badge color={getProgressColor()} size="lg">
                  Progress: {progress.assessmentScore.toFixed(0)}%
                </Badge>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowKeyboardHelp(true)}
                  leftSection={<IconKeyboard size={16} />}
                  aria-label="View keyboard navigation instructions"
                >
                  Keyboard Help
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={openTutorial}
                  leftSection={<IconHelp size={16} />}
                  aria-describedby="lab-description"
                >
                  Tutorial
                </Button>
                
                <Button 
                  onClick={validateConnections}
                  disabled={connections.filter(c => c.userCreated).length === 0}
                  aria-label={`Validate connections ${connections.filter(c => c.userCreated).length === 0 ? '(disabled - no connections created)' : ''}`}
                >
                  Validate Connections
                </Button>
                
                <Button 
                  variant="outline" 
                  color="red"
                  onClick={resetLab}
                  disabled={connections.filter(c => c.userCreated).length === 0}
                  aria-label={`Reset lab ${connections.filter(c => c.userCreated).length === 0 ? '(disabled - no connections to reset)' : ''}`}
                >
                  Reset Lab
                </Button>
              </Group>
            </Group>

            {/* Screen Reader Instructions */}
            <div className="sr-only" role="region" aria-live="polite" id="sr-instructions">
              <p>
                Welcome to the Interconnection and Dataflow Analysis Lab. This lab has multiple sections:
                1. Factory visualization showing industrial systems
                2. Connection mapping tools for creating system interconnections
                3. Dataflow analysis panel with security assessment
                4. Assessment panel with validation and quiz questions
              </p>
              <p>
                For keyboard users: Each system in the visualization can be selected with Tab and Enter.
                Use the Keyboard Help button for detailed navigation instructions.
              </p>
              <p>
                Screen reader users: All interactions and state changes will be announced.
                The current lab progress is {progress.assessmentScore.toFixed(0)}%.
              </p>
            </div>

            {/* Connection mode alert */}
            {isConnecting && connectionStart && (
              <Alert color="blue" variant="light">
                <Group justify="space-between" align="center">
                  <Text size="sm">
                    <strong>Connection Mode Active:</strong> Creating connection from {connectionStart.name}. 
                    Click a target system or use the connection mapper panel.
                  </Text>
                  <Button size="xs" variant="subtle" onClick={handleCancelConnection}>
                    Cancel
                  </Button>
                </Group>
              </Alert>
            )}

            {/* Main Lab Content */}
            <div style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              {/* Left Panel - Connection Mapper */}
              <Paper 
                className="lab-panel"
                p="md"
                shadow="sm"
                style={{ 
                  minWidth: '300px', 
                  maxWidth: '350px'
                }}
                role="complementary"
                aria-label="Connection mapping tools"
              >
                <ConnectionMapper
                  systems={systems}
                  connections={connections}
                  selectedSystem={selectedSystem}
                  selectedConnection={selectedConnection}
                  isConnecting={isConnecting}
                  connectionStart={connectionStart}
                  validationResults={validationResults}
                  onCreateConnection={handleCreateConnection}
                  onDeleteConnection={handleDeleteConnection}
                  onCancelConnection={handleCancelConnection}
                  onValidateConnections={validateConnections}
                />
              </Paper>

              {/* Center Panel - Factory Visualization */}
              <Paper 
                className="lab-visualization"
                shadow="sm"
                style={{ flex: 1 }}
                role="main"
                aria-labelledby="lab-title"
                aria-describedby="lab-description"
              >
                <FactoryVisualization
                  systems={systems}
                  connections={connections}
                  selectedSystem={selectedSystem}
                  selectedConnection={selectedConnection}
                  hoveredSystem={hoveredSystem}
                  showDataflows={showDataflows}
                  isConnecting={isConnecting}
                  connectionStart={connectionStart}
                  onSystemClick={handleSystemClick}
                  onSystemHover={handleSystemHover}
                  onConnectionClick={handleConnectionClick}
                  onStartConnection={handleStartConnection}
                  onCompleteConnection={handleCompleteConnection}
                  onToggleDataflows={handleToggleDataflows}
                  onKeyboardAssign={handleKeyboardAssign}
                />
              </Paper>

              {/* Right Panel - Analysis & Assessment */}
              <Paper 
                className="lab-panel"
                shadow="sm"
                style={{ 
                  minWidth: '350px', 
                  maxWidth: '400px'
                }}
                role="complementary"
                aria-label="Analysis and assessment tools"
              >
                <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'analysis')} orientation="horizontal">
                  <Tabs.List>
                    <Tabs.Tab value="analysis" leftSection={<IconBulb size={16} />}>
                      Analysis
                    </Tabs.Tab>
                    <Tabs.Tab value="assessment" leftSection={<IconKeyboard size={16} />}>
                      Assessment
                    </Tabs.Tab>
                  </Tabs.List>

                  <div style={{ marginTop: '1rem' }}>
                    <Tabs.Panel value="analysis">
                      <DataflowAnalysisPanel
                        systems={systems}
                        selectedSystem={selectedSystem}
                        showDataflows={showDataflows}
                        showThreats={showThreats}
                        onToggleDataflows={handleToggleDataflows}
                        onToggleThreats={handleToggleThreats}
                        onAnalyzeSystem={analyzeSystem}
                      />
                    </Tabs.Panel>

                    <Tabs.Panel value="assessment">
                      <AssessmentPanel
                        progress={progress}
                        validationResults={validationResults}
                        systems={systems}
                        connections={connections}
                        onValidateConnections={validateConnections}
                        onExportResults={handleExportResults}
                      />
                    </Tabs.Panel>
                  </div>
                </Tabs>
              </Paper>
            </div>
          </Stack>
        </Container>

        {/* Tutorial Modal */}
        <TutorialModal
          opened={tutorialOpened}
          onClose={closeTutorial}
          onStartLab={() => {
            setActiveTab('analysis');
            closeTutorial();
          }}
        />
      </AppShell>
    </>
  );
}