import { useRef, useCallback, useState, useEffect } from 'react';
import { Paper, Title, Group, Button, ActionIcon, Tooltip, Stack, Text, Badge } from '@mantine/core';
import { IconZoomIn, IconZoomOut, IconRefresh, IconEye, IconEyeOff, IconKeyboard } from '@tabler/icons-react';
import { SystemNode, SystemConnection, CONNECTION_TYPES, SYSTEM_TYPES } from '../types';

interface FactoryVisualizationProps {
  systems: SystemNode[];
  connections: SystemConnection[];
  selectedSystem: SystemNode | null;
  selectedConnection: SystemConnection | null;
  hoveredSystem: SystemNode | null;
  showDataflows: boolean;
  isConnecting: boolean;
  connectionStart: SystemNode | null;
  onSystemClick: (system: SystemNode) => void;
  onSystemHover: (system: SystemNode | null) => void;
  onConnectionClick: (connection: SystemConnection) => void;
  onStartConnection: (system: SystemNode) => void;
  onCompleteConnection: (targetSystem: SystemNode) => void;
  onToggleDataflows: () => void;
  onKeyboardAssign: (system: SystemNode) => void;
}

export function FactoryVisualization({
  systems,
  connections,
  selectedSystem,
  selectedConnection,
  hoveredSystem,
  showDataflows,
  isConnecting,
  connectionStart,
  onSystemClick,
  onSystemHover,
  onConnectionClick,
  onStartConnection,
  onCompleteConnection,
  onToggleDataflows,
  onKeyboardAssign
}: FactoryVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  // SVG dimensions
  const SVG_WIDTH = 800;
  const SVG_HEIGHT = 600;
  const VIEW_BOX = `${-pan.x} ${-pan.y} ${SVG_WIDTH / zoom} ${SVG_HEIGHT / zoom}`;

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = (e.clientX - lastPanPoint.x) / zoom;
      const deltaY = (e.clientY - lastPanPoint.y) / zoom;
      setPan(prev => ({
        x: prev.x - deltaX,
        y: prev.y - deltaY
      }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, lastPanPoint, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Add event listeners for mouse events
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsPanning(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const handleSystemClick = useCallback((system: SystemNode, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isConnecting && connectionStart) {
      if (system.id !== connectionStart.id) {
        onCompleteConnection(system);
      }
    } else {
      onSystemClick(system);
    }
  }, [isConnecting, connectionStart, onSystemClick, onCompleteConnection]);

  const handleSystemDoubleClick = useCallback((system: SystemNode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isConnecting) {
      onStartConnection(system);
    }
  }, [isConnecting, onStartConnection]);

  const handleConnectionClick = useCallback((connection: SystemConnection, e: React.MouseEvent) => {
    e.stopPropagation();
    onConnectionClick(connection);
  }, [onConnectionClick]);

  // Render connection line between two systems
  const renderConnection = useCallback((connection: SystemConnection) => {
    const sourceSystem = systems.find(s => s.id === connection.sourceId);
    const targetSystem = systems.find(s => s.id === connection.targetId);
    
    if (!sourceSystem || !targetSystem) return null;

    const connectionType = CONNECTION_TYPES[connection.connectionType];
    const isSelected = selectedConnection?.id === connection.id;
    const strokeWidth = isSelected ? 3 : 2;
    const opacity = showDataflows ? 0.8 : 1;

    // Calculate connection points
    const x1 = sourceSystem.location.x;
    const y1 = sourceSystem.location.y;
    const x2 = targetSystem.location.x;
    const y2 = targetSystem.location.y;

    // Add arrowhead for unidirectional connections
    const isUnidirectional = connection.dataFlow === 'unidirectional';
    const arrowId = `arrow-${connection.id}`;

    return (
      <g key={connection.id}>
        {/* Arrow marker definition */}
        {isUnidirectional && (
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX="9"
              refY="3"
              markerUnits="strokeWidth"
              markerWidth="4"
              markerHeight="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={connectionType.color} />
            </marker>
          </defs>
        )}
        
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={connectionType.color}
          strokeWidth={strokeWidth}
          strokeDasharray={connectionType.strokeStyle === 'dashed' ? '5,5' : 
                          connectionType.strokeStyle === 'dotted' ? '2,3' : 
                          connectionType.strokeStyle === 'dash-dot' ? '8,3,2,3' : 'none'}
          opacity={opacity}
          markerEnd={isUnidirectional ? `url(#${arrowId})` : undefined}
          style={{ cursor: 'pointer' }}
          onClick={(e) => handleConnectionClick(connection, e)}
          role="button"
          tabIndex={0}
        />
        
        {/* Connection label */}
        {isSelected && (
          <text
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2 - 10}
            textAnchor="middle"
            fontSize="10"
            fill="#333"
            style={{ pointerEvents: 'none' }}
          >
          </text>
        )}
      </g>
    );
  }, [systems, selectedConnection, showDataflows, handleConnectionClick]);

  // Render system node
  const renderSystem = useCallback((system: SystemNode) => {
    const systemType = SYSTEM_TYPES[system.type];
    const isSelected = selectedSystem?.id === system.id;
    const isHovered = hoveredSystem?.id === system.id;
    const isConnectionStart = connectionStart?.id === system.id;
    const isConnectable = isConnecting && connectionStart && system.id !== connectionStart.id;
    
    const baseSize = 40;
    const size = isSelected || isHovered || isConnectionStart ? baseSize * 1.2 : baseSize;
    const strokeWidth = isSelected || isConnectionStart ? 3 : 1;
    
    let strokeColor = systemType.color;
    if (isConnectionStart) strokeColor = systemType.color;
    else if (isConnectable) strokeColor = systemType.color;
    else if (isSelected) strokeColor = systemType.color;

    // Get icon based on system category
    const getSystemIcon = () => {
      switch (system.category) {
        case 'control_system': return '⚙️';
        case 'sensor': return '📡';
        case 'actuator': return '🔧';
        case 'network': return '🌐';
        case 'server': return '🖥️';
        case 'workstation': return '💻';
        case 'database': return '🗄️';
        case 'external_service': return '🏢';
        default: return '📦';
      }
    };

    return (
      <g key={system.id}>
        {/* System node background */}
        <circle
          cx={system.location.x}
          cy={system.location.y}
          r={size / 2}
          fill={systemType.color}
          fillOpacity={0.1}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          style={{ cursor: 'pointer' }}
          onClick={(e) => handleSystemClick(system, e)}
          onDoubleClick={(e) => handleSystemDoubleClick(system, e)}
          onMouseEnter={() => onSystemHover(system)}
          onMouseLeave={() => onSystemHover(null)}
          role="button"
          tabIndex={0}
          aria-label={`${system.name} - ${system.description}`}
        />
        
        {/* System icon */}
        <text
          x={system.location.x}
          y={system.location.y + 5}
          textAnchor="middle"
          fontSize="16"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {getSystemIcon()}
        </text>
        
        {/* System name label */}
        <text
          x={system.location.x}
          y={system.location.y + size/2 + 15}
          textAnchor="middle"
          fontSize="10"
          fill="#333"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {system.name.length > 15 ? system.name.substring(0, 15) + '...' : system.name}
        </text>
        
        {/* Criticality indicator */}
        {system.criticality === 'critical' && (
          <circle
            cx={system.location.x + size/2 - 5}
            cy={system.location.y - size/2 + 5}
            r="4"
            fill="#ff6b6b"
            style={{ pointerEvents: 'none' }}
          />
        )}
        
        {/* Connection indicator for connecting mode */}
        {isConnectable && (
          <circle
            cx={system.location.x}
            cy={system.location.y}
            r={size / 2 + 5}
            fill="none"
            stroke="#51cf66"
            strokeWidth="2"
            strokeDasharray="3,3"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </g>
    );
  }, [selectedSystem, hoveredSystem, connectionStart, isConnecting, onSystemHover, handleSystemClick, handleSystemDoubleClick]);

  // Render zone backgrounds
  const renderZones = useCallback(() => {
    const zones = [
      { name: 'Production Floor', x: 150, y: 150, width: 500, height: 200, color: '#e8f5e8' },
      { name: 'Control Room', x: 50, y: 50, width: 200, height: 100, color: '#e3f2fd' },
      { name: 'Server Room', x: 450, y: 50, width: 300, height: 450, color: '#fff3e0' },
      { name: 'Office', x: 50, y: 350, width: 400, height: 200, color: '#f3e5f5' }
    ];

    return zones.map(zone => (
      <g key={zone.name}>
        <rect
          x={zone.x}
          y={zone.y}
          width={zone.width}
          height={zone.height}
          fill={zone.color}
          fillOpacity={0.3}
          stroke="#ccc"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        <text
          x={zone.x + 10}
          y={zone.y + 20}
          fontSize="12"
          fill="#666"
          fontWeight="bold"
        >
          {zone.name}
        </text>
      </g>
    ));
  }, []);

  return (
    <Paper p="md" shadow="sm" style={{ height: '100%' }}>
      <Stack gap="md" style={{ height: '100%' }}>
        {/* Header with controls */}
        <Group justify="space-between" align="center">
          <div>
            <Title order={4}>SweetTech Cookie Factory Layout</Title>
            <Text size="sm" c="dimmed">
              Click systems to select, double-click to start connections
            </Text>
          </div>
          
          <Group gap="xs">
            <Tooltip label="Toggle dataflow visualization">
              <ActionIcon
                variant={showDataflows ? 'filled' : 'outline'}
                onClick={onToggleDataflows}
                aria-label="Toggle dataflow visualization"
              >
                {showDataflows ? <IconEye size={16} /> : <IconEyeOff size={16} />}
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="Zoom in">
              <ActionIcon onClick={handleZoomIn} disabled={zoom >= 3}>
                <IconZoomIn size={16} />
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="Zoom out">
              <ActionIcon onClick={handleZoomOut} disabled={zoom <= 0.5}>
                <IconZoomOut size={16} />
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="Reset view">
              <ActionIcon onClick={handleResetView}>
                <IconRefresh size={16} />
              </ActionIcon>
            </Tooltip>

            <Button
              size="xs"
              variant="outline"
              leftSection={<IconKeyboard size={14} />}
              onClick={() => selectedSystem && onKeyboardAssign(selectedSystem)}
              disabled={!selectedSystem}
            >
              Keyboard Mode
            </Button>
          </Group>
        </Group>

        {/* Connection mode indicator */}
        {isConnecting && connectionStart && (
          <Badge color="blue" variant="filled" size="lg">
            Connecting from {connectionStart.name} - Click target system
          </Badge>
        )}

        {/* SVG Factory Layout */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            background: '#fafafa',
            cursor: isPanning ? 'grabbing' : isConnecting ? 'crosshair' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={VIEW_BOX}
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block' }}
            role="img"
            aria-label="Interactive factory system layout"
          >
            {/* Zone backgrounds */}
            {renderZones()}
            
            {/* Connections */}
            {connections.map(renderConnection)}
            
            {/* Systems */}
            {systems.map(renderSystem)}
            
            {/* Active connection preview */}
            {isConnecting && connectionStart && hoveredSystem && hoveredSystem.id !== connectionStart.id && (
              <line
                x1={connectionStart.location.x}
                y1={connectionStart.location.y}
                x2={hoveredSystem.location.x}
                y2={hoveredSystem.location.y}
                stroke="#51cf66"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
                style={{ pointerEvents: 'none' }}
              />
            )}
          </svg>
        </div>

        {/* Legend */}
        <Paper p="sm" style={{ backgroundColor: '#f8f9fa' }}>
          <Group gap="md" justify="center">
            {Object.entries(SYSTEM_TYPES).map(([key, type]) => (
              <Group key={key} gap="xs">
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: type.color,
                    opacity: 0.7
                  }}
                />
                <Text size="xs">{type.label}</Text>
              </Group>
            ))}
          </Group>
        </Paper>
      </Stack>
    </Paper>
  );
}