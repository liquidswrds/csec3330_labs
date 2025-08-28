import { useState } from 'react';
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Select,
  Tabs,
  ScrollArea,
  Progress,
  Alert,
  Divider,
  ActionIcon,
  Tooltip,
  ThemeIcon
} from '@mantine/core';
import {
  IconFileChart,
  IconShield,
  IconAlertTriangle,
  IconEye,
  IconChartBar,
  IconInfoCircle,
  IconExclamationMark
} from '@tabler/icons-react';
import { SystemNode } from '../types';
import { dataFlows, securityThreats } from '../data/factoryData';

interface DataflowAnalysisPanelProps {
  systems: SystemNode[];
  selectedSystem: SystemNode | null;
  showDataflows: boolean;
  showThreats: boolean;
  onToggleDataflows: () => void;
  onToggleThreats: () => void;
  onAnalyzeSystem: (systemId: string) => void;
}

export function DataflowAnalysisPanel({
  systems,
  selectedSystem,
  showDataflows,
  showThreats,
  onToggleDataflows,
  onToggleThreats,
  onAnalyzeSystem
}: DataflowAnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState<string>('dataflows');
  const [selectedDataType, setSelectedDataType] = useState<string>('all');
  const [selectedThreatType, setSelectedThreatType] = useState<string>('all');

  // Calculate analysis metrics (simplified for beginner lab)
  const getTotalConnections = () => 0;
  const getUserCreatedConnections = () => 0;
  const getSecureConnections = () => 0;

  // Get dataflows based on connections
  const getActiveDataflows = () => {
    if (selectedDataType === 'all') return dataFlows;
    return dataFlows.filter(df => df.dataType === selectedDataType);
  };

  // Get relevant threats for system
  const getSystemThreats = (systemId: string) => {
    return securityThreats.filter(threat => 
      threat.affectedSystems.includes(systemId)
    );
  };

  // Risk assessment calculations
  const calculateSystemRisk = (system: SystemNode) => {
    const threats = getSystemThreats(system.id);
    // Simplified risk calculation for beginner lab
    
    let riskScore = 0;
    
    // Base risk from criticality
    switch (system.criticality) {
      case 'critical': riskScore += 40; break;
      case 'high': riskScore += 30; break;
      case 'medium': riskScore += 20; break;
      case 'low': riskScore += 10; break;
    }
    
    // Risk from threats
    threats.forEach(threat => {
      switch (threat.severity) {
        case 'critical': riskScore += 25; break;
        case 'high': riskScore += 15; break;
        case 'medium': riskScore += 10; break;
        case 'low': riskScore += 5; break;
      }
    });
    
    // Risk from insecure connections
    riskScore += 0; // Simplified for beginner lab
    
    return Math.min(riskScore, 100);
  };

  const getRiskLevel = (score: number): { level: string; color: string } => {
    if (score >= 70) return { level: 'Critical', color: 'red' };
    if (score >= 50) return { level: 'High', color: 'orange' };
    if (score >= 30) return { level: 'Medium', color: 'yellow' };
    return { level: 'Low', color: 'green' };
  };

  const renderDataflowAnalysis = () => {
    const activeDataflows = getActiveDataflows();
    
    return (
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fw={500} size="sm">Data Flow Analysis</Text>
          <Select
            size="xs"
            placeholder="Filter by data type"
            value={selectedDataType}
            onChange={(value) => setSelectedDataType(value || 'all')}
            data={[
              { value: 'all', label: 'All Data Types' },
              { value: 'control_commands', label: 'Control Commands' },
              { value: 'sensor_data', label: 'Sensor Data' },
              { value: 'status_reports', label: 'Status Reports' },
              { value: 'configuration', label: 'Configuration' },
              { value: 'business_data', label: 'Business Data' },
              { value: 'alarms', label: 'Alarms' },
              { value: 'logs', label: 'Logs' }
            ]}
            style={{ minWidth: 150 }}
          />
        </Group>

        <ScrollArea style={{ height: 300 }}>
          <Stack gap="xs">
            {activeDataflows.map(dataflow => (
              <Paper key={dataflow.id} p="sm" style={{ border: '1px solid #e9ecef' }}>
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Text fw={500} size="sm">{dataflow.name}</Text>
                    <Text size="xs" c="dimmed" lineClamp={2}>
                      {dataflow.description}
                    </Text>
                    <Group gap="xs" mt="xs">
                      <Badge size="xs" color="blue">
                        {dataflow.dataType.replace('_', ' ')}
                      </Badge>
                      <Badge size="xs" variant="outline">
                        {dataflow.classification}
                      </Badge>
                      <Badge size="xs" color={
                        dataflow.sensitivity === 'restricted' ? 'red' :
                        dataflow.sensitivity === 'confidential' ? 'orange' :
                        dataflow.sensitivity === 'internal' ? 'yellow' : 'green'
                      }>
                        {dataflow.sensitivity}
                      </Badge>
                    </Group>
                  </div>
                  <Group gap="xs">
                    <ThemeIcon size="sm" color="blue" variant="light">
                      <IconFileChart size={12} />
                    </ThemeIcon>
                  </Group>
                </Group>
                
                <Group gap="md" mt="xs">
                  <Text size="xs">
                    <strong>Volume:</strong> {dataflow.volume}
                  </Text>
                </Group>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    );
  };

  const renderThreatAnalysis = () => {
    const filteredThreats = selectedThreatType === 'all' 
      ? securityThreats
      : securityThreats.filter(t => t.type === selectedThreatType);

    return (
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fw={500} size="sm">Security Threat Analysis</Text>
          <Select
            size="xs"
            placeholder="Filter by threat type"
            value={selectedThreatType}
            onChange={(value) => setSelectedThreatType(value || 'all')}
            data={[
              { value: 'all', label: 'All Threats' },
              { value: 'unauthorized_access', label: 'Unauthorized Access' },
              { value: 'data_theft', label: 'Data Theft' },
              { value: 'service_disruption', label: 'Service Disruption' },
              { value: 'malware', label: 'Malware' },
              { value: 'insider_threat', label: 'Insider Threat' }
            ]}
            style={{ minWidth: 150 }}
          />
        </Group>

        <ScrollArea style={{ height: 300 }}>
          <Stack gap="xs">
            {filteredThreats.map(threat => (
              <Paper 
                key={threat.id} 
                p="sm" 
                style={{ 
                  border: `1px solid ${threat.severity === 'critical' ? '#ff6b6b' : '#e9ecef'}`,
                  backgroundColor: threat.severity === 'critical' ? '#fff5f5' : '#ffffff'
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Group gap="xs" align="center">
                      <ThemeIcon size="sm" color={
                        threat.severity === 'critical' ? 'red' :
                        threat.severity === 'high' ? 'orange' :
                        threat.severity === 'medium' ? 'yellow' : 'green'
                      } variant="light">
                        {threat.severity === 'critical' ? 
                          <IconExclamationMark size={12} /> : 
                          <IconAlertTriangle size={12} />
                        }
                      </ThemeIcon>
                      <Text fw={500} size="sm">{threat.name}</Text>
                    </Group>
                    
                    <Text size="xs" c="dimmed" lineClamp={2} mt="xs">
                      {threat.description}
                    </Text>
                    
                    <Group gap="xs" mt="xs">
                      <Badge size="xs" color={
                        threat.severity === 'critical' ? 'red' :
                        threat.severity === 'high' ? 'orange' :
                        threat.severity === 'medium' ? 'yellow' : 'green'
                      }>
                        {threat.severity} severity
                      </Badge>
                      <Badge size="xs" variant="outline">
                        {threat.likelihood.replace('_', ' ')} likelihood
                      </Badge>
                    </Group>
                  </div>
                </Group>
                
                <Text size="xs" mt="xs">
                  <strong>Affected Systems:</strong> {threat.affectedSystems.length} systems
                </Text>
                <Text size="xs" mt="xs">
                  <strong>Mitigations:</strong> {threat.mitigations.join(', ')}
                </Text>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    );
  };

  const renderRiskAssessment = () => {
    const systemsWithRisk = systems.map(system => ({
      ...system,
      riskScore: calculateSystemRisk(system)
    })).sort((a, b) => b.riskScore - a.riskScore);

    const avgRisk = systemsWithRisk.reduce((sum, s) => sum + s.riskScore, 0) / systemsWithRisk.length;
    const criticalSystems = systemsWithRisk.filter(s => s.riskScore >= 70);
    
    return (
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fw={500} size="sm">Risk Assessment</Text>
          <Badge color={avgRisk >= 50 ? 'red' : avgRisk >= 30 ? 'yellow' : 'green'}>
            Avg Risk: {avgRisk.toFixed(0)}%
          </Badge>
        </Group>

        {criticalSystems.length > 0 && (
          <Alert
            icon={<IconExclamationMark size={16} />}
            color="red"
            variant="light"
          >
            <Text size="xs">
              {criticalSystems.length} system{criticalSystems.length > 1 ? 's' : ''} with critical risk level
            </Text>
          </Alert>
        )}

        <ScrollArea style={{ height: 250 }}>
          <Stack gap="xs">
            {systemsWithRisk.map(system => {
              const risk = getRiskLevel(system.riskScore);
              const threats = getSystemThreats(system.id);
              
              return (
                <Paper 
                  key={system.id} 
                  p="sm" 
                  style={{ 
                    border: `1px solid ${risk.color === 'red' ? '#ff6b6b' : '#e9ecef'}`,
                    cursor: 'pointer',
                    backgroundColor: selectedSystem?.id === system.id ? '#f0f8ff' : 'white'
                  }}
                  onClick={() => onAnalyzeSystem(system.id)}
                >
                  <Group justify="space-between" align="flex-start">
                    <div style={{ flex: 1 }}>
                      <Group gap="xs" align="center">
                        <Text fw={500} size="sm" lineClamp={1}>
                          {system.name}
                        </Text>
                        <Badge size="xs" color={risk.color}>
                          {risk.level}
                        </Badge>
                      </Group>
                      
                      <Progress
                        value={system.riskScore}
                        color={risk.color}
                        size="xs"
                        mt="xs"
                        aria-label={`Risk level: ${system.riskScore}%`}
                      />
                      
                      <Group gap="md" mt="xs">
                        <Text size="xs">
                          <strong>Criticality:</strong> {system.criticality}
                        </Text>
                        <Text size="xs">
                          <strong>Threats:</strong> {threats.length}
                        </Text>
                        <Text size="xs">
                          <strong>Connections:</strong> 0
                        </Text>
                      </Group>
                    </div>
                    
                    <Text size="xs" fw={700} c={risk.color}>
                      {system.riskScore}%
                    </Text>
                  </Group>
                </Paper>
              );
            })}
          </Stack>
        </ScrollArea>
      </Stack>
    );
  };

  const renderSystemAnalysis = () => {
    if (!selectedSystem) {
      return (
        <Paper p="lg" style={{ textAlign: 'center', border: '1px dashed #e9ecef' }}>
          <IconInfoCircle size={48} style={{ margin: '0 auto 16px', color: '#adb5bd' }} />
          <Text size="sm" c="dimmed">
            Select a system from the visualization to view detailed analysis
          </Text>
        </Paper>
      );
    }

    // Simplified for beginner lab - no connection analysis
    const systemThreats = getSystemThreats(selectedSystem.id);
    const riskScore = calculateSystemRisk(selectedSystem);
    const risk = getRiskLevel(riskScore);

    return (
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fw={500} size="sm">{selectedSystem.name}</Text>
          <Badge color={risk.color}>
            {risk.level} Risk ({riskScore}%)
          </Badge>
        </Group>

        <Text size="xs" c="dimmed">
          {selectedSystem.description}
        </Text>

        <Group gap="xs">
          <Badge size="sm" color="blue">
            {selectedSystem.type.replace('_', ' ')}
          </Badge>
          <Badge size="sm" variant="outline">
            {selectedSystem.category.replace('_', ' ')}
          </Badge>
          <Badge size="sm" color={
            selectedSystem.criticality === 'critical' ? 'red' :
            selectedSystem.criticality === 'high' ? 'orange' :
            selectedSystem.criticality === 'medium' ? 'yellow' : 'green'
          }>
            {selectedSystem.criticality}
          </Badge>
        </Group>

        <Divider />

        <Group grow>
          <Paper p="sm" style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <Text fw={500} size="xl">0</Text>
            <Text size="xs" c="dimmed">Connections</Text>
          </Paper>
          <Paper p="sm" style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <Text fw={500} size="xl">{systemThreats.length}</Text>
            <Text size="xs" c="dimmed">Threats</Text>
          </Paper>
          <Paper p="sm" style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <Text size="xs" c="dimmed">Protocols</Text>
          </Paper>
        </Group>

        <Divider />


        {systemThreats.length > 0 && (
          <div>
            <Text fw={500} size="sm" mb="xs">Security Threats</Text>
            <Stack gap="xs">
              {systemThreats.slice(0, 3).map(threat => (
                <Paper key={threat.id} p="xs" style={{ backgroundColor: '#fff5f5', border: '1px solid #ffcccc' }}>
                  <Group justify="space-between" align="center">
                    <Text size="xs" fw={500}>{threat.name}</Text>
                    <Badge size="xs" color="red">
                      {threat.severity}
                    </Badge>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </div>
        )}
      </Stack>
    );
  };

  return (
    <Paper p="md" shadow="sm" style={{ height: '100%' }}>
      <Stack gap="md" style={{ height: '100%' }}>
        <Group justify="space-between" align="center">
          <Title order={4}>Dataflow Analysis</Title>
          <Group gap="xs">
            <Tooltip label="Toggle dataflow visualization">
              <ActionIcon
                variant={showDataflows ? 'filled' : 'outline'}
                color="blue"
                onClick={onToggleDataflows}
                aria-label="Toggle dataflow visualization"
              >
                <IconEye size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Toggle threat indicators">
              <ActionIcon
                variant={showThreats ? 'filled' : 'outline'}
                color="red"
                onClick={onToggleThreats}
                aria-label="Toggle threat indicators"
              >
                <IconShield size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Summary Stats */}
        <Paper p="sm" style={{ backgroundColor: '#f8f9fa' }}>
          <Group justify="space-around">
            <div style={{ textAlign: 'center' }}>
              <Text fw={500} size="lg">{getTotalConnections()}</Text>
              <Text size="xs" c="dimmed">Total Connections</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text fw={500} size="lg">{getUserCreatedConnections()}</Text>
              <Text size="xs" c="dimmed">User Created</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text fw={500} size="lg">{getSecureConnections()}</Text>
              <Text size="xs" c="dimmed">Secure</Text>
            </div>
          </Group>
        </Paper>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'dataflows')} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Tabs.List>
            <Tabs.Tab value="dataflows" leftSection={<IconFileChart size={16} />}>
              Data Flows
            </Tabs.Tab>
            <Tabs.Tab value="threats" leftSection={<IconAlertTriangle size={16} />}>
              Threats
            </Tabs.Tab>
            <Tabs.Tab value="risk" leftSection={<IconChartBar size={16} />}>
              Risk Analysis
            </Tabs.Tab>
            <Tabs.Tab value="system" leftSection={<IconInfoCircle size={16} />}>
              System Info
            </Tabs.Tab>
          </Tabs.List>

          <div style={{ flex: 1, marginTop: '1rem' }}>
            <Tabs.Panel value="dataflows">
              {renderDataflowAnalysis()}
            </Tabs.Panel>

            <Tabs.Panel value="threats">
              {renderThreatAnalysis()}
            </Tabs.Panel>

            <Tabs.Panel value="risk">
              {renderRiskAssessment()}
            </Tabs.Panel>

            <Tabs.Panel value="system">
              {renderSystemAnalysis()}
            </Tabs.Panel>
          </div>
        </Tabs>
      </Stack>
    </Paper>
  );
}