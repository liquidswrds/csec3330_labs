// Core types for the interconnection and dataflow analysis lab
export interface SystemNode {
  id: string;
  name: string;
  description: string;
  type: 'production' | 'support' | 'business' | 'infrastructure';
  category: 'control_system' | 'sensor' | 'actuator' | 'network' | 'server' | 'workstation' | 'database' | 'external_service';
  criticality: 'low' | 'medium' | 'high' | 'critical';
  location: {
    x: number;
    y: number;
    zone: 'production_floor' | 'control_room' | 'server_room' | 'office' | 'external';
  };
}

export interface SystemConnection {
  id: string;
  sourceId: string;
  targetId: string;
  connectionType: 'physical' | 'network' | 'wireless' | 'logical';
  dataFlow: 'unidirectional' | 'bidirectional';
  direction?: 'source_to_target' | 'target_to_source';
  isCorrect?: boolean;
  userCreated: boolean;
}

export interface DataflowInfo {
  id: string;
  name: string;
  description: string;
  dataType: 'control_commands' | 'sensor_data' | 'status_reports' | 'configuration' | 'business_data' | 'alarms' | 'logs';
  classification: 'operational' | 'business' | 'safety_critical';
  sensitivity: 'public' | 'internal' | 'confidential' | 'restricted';
  volume: 'low' | 'medium' | 'high';
}

export interface SecurityThreat {
  id: string;
  name: string;
  description: string;
  type: 'unauthorized_access' | 'data_theft' | 'service_disruption' | 'malware' | 'insider_threat';
  severity: 'low' | 'medium' | 'high' | 'critical';
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost_certain';
  affectedSystems: string[];
  mitigations: string[];
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'drag_drop' | 'connection_mapping' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedSystems: string[];
}

export interface LabProgress {
  currentSection: 'overview' | 'mapping' | 'dataflow' | 'assessment' | 'review';
  completedSections: string[];
  correctConnections: number;
  totalConnections: number;
  assessmentScore: number;
  timeSpent: number;
  hintsUsed: number;
  // Separate scoring for different connection types
  physicalConnectionsScore: number;
  networkConnectionsScore: number;
  logicalConnectionsScore: number;
  wirelessConnectionsScore: number;
  dataFlowScore: number;
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  action: 'highlight' | 'explain' | 'interact';
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export interface ConnectionValidation {
  isValid: boolean;
  feedback: string;
  type: 'correct' | 'incorrect' | 'partially_correct' | 'missing';
  hint?: string;
}

export interface LabState {
  systems: SystemNode[];
  connections: SystemConnection[];
  selectedSystem: SystemNode | null;
  selectedConnection: SystemConnection | null;
  hoveredSystem: SystemNode | null;
  showDataflows: boolean;
  showThreats: boolean;
  isConnecting: boolean;
  connectionStart: SystemNode | null;
  progress: LabProgress;
  tutorialMode: boolean;
  currentTutorialStep: number;
  validationResults: Map<string, ConnectionValidation>;
}

// Constants for factory systems
export const SYSTEM_TYPES = {
  production: {
    label: 'Production Systems',
    color: '#2e7d32',
    description: 'Systems directly involved in cookie manufacturing'
  },
  support: {
    label: 'Support Systems', 
    color: '#1565c0',
    description: 'Systems that support production operations'
  },
  business: {
    label: 'Business Systems',
    color: '#f57c00',
    description: 'Systems for business operations and management'
  },
  infrastructure: {
    label: 'Infrastructure',
    color: '#5e35b1',
    description: 'Network and IT infrastructure systems'
  }
} as const;

export const CONNECTION_TYPES = {
  physical: {
    label: 'Physical Connection',
    color: '#424242',
    strokeStyle: 'solid',
    description: 'Direct physical connection (cables, wires)'
  },
  network: {
    label: 'Network Connection',
    color: '#1976d2',
    strokeStyle: 'dashed',
    description: 'Network-based connection (Ethernet, TCP/IP)'
  },
  wireless: {
    label: 'Wireless Connection',
    color: '#388e3c',
    strokeStyle: 'dotted',
    description: 'Wireless connection (WiFi, Bluetooth, cellular)'
  },
  logical: {
    label: 'Logical Connection',
    color: '#f57c00',
    strokeStyle: 'dash-dot',
    description: 'Logical relationship or data dependency'
  }
} as const;


export type SystemType = keyof typeof SYSTEM_TYPES;
export type ConnectionType = keyof typeof CONNECTION_TYPES;