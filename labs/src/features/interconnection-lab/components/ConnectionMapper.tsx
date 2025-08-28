import { useState } from 'react';
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Select,
  Badge,
  Divider,
  ScrollArea,
  ActionIcon,
  Alert
} from '@mantine/core';
import { IconTrash, IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';
import { SystemNode, SystemConnection, CONNECTION_TYPES, ConnectionValidation, SYSTEM_TYPES } from '../types';

interface ConnectionMapperProps {
  systems: SystemNode[];
  connections: SystemConnection[];
  selectedSystem: SystemNode | null;
  selectedConnection: SystemConnection | null;
  isConnecting: boolean;
  connectionStart: SystemNode | null;
  validationResults: Map<string, ConnectionValidation>;
  onCreateConnection: (connection: Omit<SystemConnection, 'id'>) => void;
  onDeleteConnection: (connectionId: string) => void;
  onCancelConnection: () => void;
  onValidateConnections: () => void;
}

export function ConnectionMapper({
  systems,
  connections,
  selectedSystem,
  selectedConnection,
  isConnecting,
  connectionStart,
  validationResults,
  onCreateConnection,
  onDeleteConnection,
  onCancelConnection,
  onValidateConnections
}: ConnectionMapperProps) {
  const [newConnection, setNewConnection] = useState({
    targetId: '',
    connectionType: 'network' as keyof typeof CONNECTION_TYPES,
    dataFlow: 'bidirectional' as 'unidirectional' | 'bidirectional',
    direction: 'source_to_target' as 'source_to_target' | 'target_to_source'
  });

  // Filter systems for target selection (exclude source system)
  const availableTargets = systems.filter(s => 
    connectionStart ? s.id !== connectionStart.id : s.id !== selectedSystem?.id
  );

  // Get connections for selected system
  const systemConnections = connections.filter(conn => 
    selectedSystem && (conn.sourceId === selectedSystem.id || conn.targetId === selectedSystem.id)
  );

  const handleCreateConnection = () => {
    if (!connectionStart || !newConnection.targetId) return;

    const connectionData: Omit<SystemConnection, 'id'> = {
      sourceId: connectionStart.id,
      targetId: newConnection.targetId,
      connectionType: newConnection.connectionType,
      dataFlow: newConnection.dataFlow,
      direction: newConnection.dataFlow === 'unidirectional' ? newConnection.direction : undefined,
      userCreated: true
    };

    onCreateConnection(connectionData);
    
    // Reset form
    setNewConnection({
      targetId: '',
      connectionType: 'network',
      dataFlow: 'bidirectional',
      direction: 'source_to_target'
    });
  };

  const getConnectionDescription = (connection: SystemConnection) => {
    const sourceSystem = systems.find(s => s.id === connection.sourceId);
    const targetSystem = systems.find(s => s.id === connection.targetId);
    
    if (!sourceSystem || !targetSystem) return 'Unknown Connection';
    
    const direction = connection.dataFlow === 'unidirectional' 
      ? (connection.direction === 'source_to_target' ? '→' : '←')
      : '↔';
    
    return `${sourceSystem.name} ${direction} ${targetSystem.name}`;
  };

  const getValidationBadge = (connection: SystemConnection) => {
    const validation = validationResults.get(connection.id);
    if (!validation) return null;

    const colors = {
      correct: 'green',
      incorrect: 'red',
      partially_correct: 'yellow',
      missing: 'gray'
    };

    return (
      <Badge color={colors[validation.type]} size="sm">
        {validation.type.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <Paper p="md" shadow="sm" style={{ height: '100%' }}>
      <Stack gap="md" style={{ height: '100%' }}>
        <Title order={4}>System Interconnection Mapper</Title>
        
        {/* Selected System Info */}
        {selectedSystem && (
          <Paper p="sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500} size="sm">{selectedSystem.name}</Text>
                <Text size="xs" c="dimmed" lineClamp={2}>
                  {selectedSystem.description}
                </Text>
                <Group gap="xs" mt="xs">
                  <Badge size="xs" color={SYSTEM_TYPES[selectedSystem.type].color.replace('#', '')}>
                    {SYSTEM_TYPES[selectedSystem.type].label}
                  </Badge>
                  <Badge size="xs" variant="outline">
                    {selectedSystem.criticality}
                  </Badge>
                </Group>
              </div>
            </Group>
          </Paper>
        )}

        {/* Connection Creation Form */}
        {isConnecting && connectionStart && (
          <Paper p="sm" style={{ border: '2px solid #339af0', backgroundColor: '#e7f5ff' }}>
            <Stack gap="sm">
              <Group justify="space-between" align="center">
                <Text fw={500} size="sm">
                  Creating Connection from: {connectionStart.name}
                </Text>
                <Button size="xs" variant="subtle" onClick={onCancelConnection}>
                  Cancel
                </Button>
              </Group>
              
              <Select
                label="Target System"
                placeholder="Select target system"
                value={newConnection.targetId}
                onChange={(value) => setNewConnection(prev => ({ ...prev, targetId: value || '' }))}
                data={availableTargets.map(system => ({
                  value: system.id,
                  label: system.name
                }))}
                searchable
                clearable
              />
              
              <Group grow>
                <Select
                  label="Connection Type"
                  value={newConnection.connectionType}
                  onChange={(value) => setNewConnection(prev => ({ 
                    ...prev, 
                    connectionType: (value as keyof typeof CONNECTION_TYPES) || 'network' 
                  }))}
                  data={Object.entries(CONNECTION_TYPES).map(([key, type]) => ({
                    value: key,
                    label: type.label
                  }))}
                />
                
              </Group>
              
              <Group grow>
                <Select
                  label="Data Flow"
                  value={newConnection.dataFlow}
                  onChange={(value) => setNewConnection(prev => ({ 
                    ...prev, 
                    dataFlow: (value as 'unidirectional' | 'bidirectional') || 'bidirectional' 
                  }))}
                  data={[
                    { value: 'bidirectional', label: 'Bidirectional (↔)' },
                    { value: 'unidirectional', label: 'Unidirectional (→)' }
                  ]}
                />
                
                {newConnection.dataFlow === 'unidirectional' && (
                  <Select
                    label="Direction"
                    value={newConnection.direction}
                    onChange={(value) => setNewConnection(prev => ({ 
                      ...prev, 
                      direction: (value as 'source_to_target' | 'target_to_source') || 'source_to_target' 
                    }))}
                    data={[
                      { value: 'source_to_target', label: 'Source → Target' },
                      { value: 'target_to_source', label: 'Target → Source' }
                    ]}
                  />
                )}
              </Group>
              
              
              
              <Button
                onClick={handleCreateConnection}
                disabled={!newConnection.targetId}
                leftSection={<IconCheck size={16} />}
              >
                Create Connection
              </Button>
            </Stack>
          </Paper>
        )}

        {/* Selected Connection Details */}
        {selectedConnection && (
          <Paper p="sm" style={{ backgroundColor: '#fff3e0', border: '1px solid #ffcc02' }}>
            <Stack gap="xs">
              <Group justify="space-between" align="center">
                <Text fw={500} size="sm">Connection Details</Text>
                <ActionIcon
                  color="red"
                  variant="subtle"
                  onClick={() => onDeleteConnection(selectedConnection.id)}
                  aria-label="Delete connection"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
              
              <Text size="xs" c="dimmed">
                {getConnectionDescription(selectedConnection)}
              </Text>
              
              <Group gap="xs">
                <Badge size="xs" color={CONNECTION_TYPES[selectedConnection.connectionType].color.replace('#', '')}>
                  {CONNECTION_TYPES[selectedConnection.connectionType].label}
                </Badge>
                <Badge size="xs" variant="outline">
                  {selectedConnection.dataFlow}
                </Badge>
                {getValidationBadge(selectedConnection)}
              </Group>
              
            </Stack>
          </Paper>
        )}

        <Divider />

        {/* System Connections List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Group justify="space-between" align="center" mb="sm">
            <Text fw={500} size="sm">
              {selectedSystem ? `${selectedSystem.name} Connections` : 'All Connections'}
            </Text>
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                {connections.filter(c => c.userCreated).length} created
              </Text>
              <Button size="xs" onClick={onValidateConnections}>
                Validate
              </Button>
            </Group>
          </Group>
          
          <ScrollArea style={{ flex: 1 }}>
            <Stack gap="xs">
              {(selectedSystem ? systemConnections : connections).map(connection => {
                const validation = validationResults.get(connection.id);
                
                return (
                  <Paper
                    key={connection.id}
                    p="xs"
                    style={{
                      border: selectedConnection?.id === connection.id ? '2px solid #339af0' : '1px solid #e9ecef',
                      cursor: 'pointer',
                      backgroundColor: connection.userCreated ? '#f8f9fa' : '#ffffff'
                    }}
                    onClick={() => {/* Handle connection selection */}}
                  >
                    <Group justify="space-between" align="flex-start">
                      <div style={{ flex: 1 }}>
                        <Text size="xs" fw={500} lineClamp={1}>
                          {getConnectionDescription(connection)}
                        </Text>
                        <Group gap="xs" mt="2px">
                          <Badge size="xs" color={CONNECTION_TYPES[connection.connectionType].color.replace('#', '')}>
                            {CONNECTION_TYPES[connection.connectionType].label}
                          </Badge>
                        </Group>
                        
                        {validation && validation.feedback && (
                          <Alert
                            icon={validation.type === 'correct' ? <IconCheck size={14} /> : <IconX size={14} />}
                            color={validation.type === 'correct' ? 'green' : 'red'}
                            variant="light"
                            mt="xs"
                          >
                            <Text size="xs">{validation.feedback}</Text>
                          </Alert>
                        )}
                      </div>
                      
                      <Group gap="xs">
                        {getValidationBadge(connection)}
                        {connection.userCreated && (
                          <ActionIcon
                            size="xs"
                            color="red"
                            variant="subtle"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConnection(connection.id);
                            }}
                            aria-label="Delete connection"
                          >
                            <IconTrash size={12} />
                          </ActionIcon>
                        )}
                      </Group>
                    </Group>
                  </Paper>
                );
              })}
              
              {(selectedSystem ? systemConnections : connections).length === 0 && (
                <Paper p="md" style={{ textAlign: 'center', border: '1px dashed #e9ecef' }}>
                  <Text size="sm" c="dimmed">
                    {selectedSystem ? 'No connections for this system' : 'No connections created'}
                  </Text>
                  <Text size="xs" c="dimmed" mt="xs">
                    Double-click a system to start creating connections
                  </Text>
                </Paper>
              )}
            </Stack>
          </ScrollArea>
        </div>

        {/* Instructions */}
        <Paper p="sm" style={{ backgroundColor: '#e3f2fd', border: '1px solid #bbdefb' }}>
          <Group gap="xs" align="flex-start">
            <IconInfoCircle size={16} style={{ marginTop: 2, flexShrink: 0 }} />
            <Stack gap="xs">
              <Text size="xs" fw={500}>How to Create Connections:</Text>
              <Text size="xs" c="dimmed">
                1. Double-click a system in the visualization to start connecting
              </Text>
              <Text size="xs" c="dimmed">
                2. Fill out connection details in the form above
              </Text>
              <Text size="xs" c="dimmed">
                3. Click "Create Connection" to add the interconnection
              </Text>
              <Text size="xs" c="dimmed">
                4. Use "Validate" to check your connections against the correct answers
              </Text>
            </Stack>
          </Group>
        </Paper>
      </Stack>
    </Paper>
  );
}