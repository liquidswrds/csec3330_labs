import { SystemNode, SystemConnection, DataflowInfo, SecurityThreat } from '../types';

// SweetTech Cookie Manufacturing Company Factory Systems
export const factorySystems: SystemNode[] = [
  // Production Control Systems
  {
    id: 'recipe-management',
    name: 'Recipe Management System',
    description: 'Central system managing cookie recipes, ingredient proportions, and production parameters',
    type: 'production',
    category: 'control_system',
    criticality: 'critical',
    location: { x: 150, y: 100, zone: 'control_room' },
  },
  {
    id: 'mixing-station-controller',
    name: 'Mixing Station Controller',
    description: 'PLC controlling ingredient mixing processes, timing, and quality parameters',
    type: 'production',
    category: 'control_system',
    criticality: 'critical',
    location: { x: 200, y: 250, zone: 'production_floor' },
  },
  {
    id: 'baking-oven-controller',
    name: 'Baking Oven Temperature Controller',
    description: 'Temperature control system for industrial baking ovens with precise heating control',
    type: 'production',
    category: 'control_system',
    criticality: 'critical',
    location: { x: 400, y: 250, zone: 'production_floor' },
  },
  {
    id: 'packaging-line-automation',
    name: 'Packaging Line Automation',
    description: 'Automated packaging system with wrapping, sealing, and labeling capabilities',
    type: 'production',
    category: 'control_system',
    criticality: 'high',
    location: { x: 600, y: 250, zone: 'production_floor' },
  },

  // Sensors and Monitoring
  {
    id: 'temperature-sensors',
    name: 'Temperature Sensors',
    description: 'Network of temperature sensors throughout production areas monitoring ambient and equipment temperatures',
    type: 'production',
    category: 'sensor',
    criticality: 'high',
    location: { x: 400, y: 200, zone: 'production_floor' },
  },
  {
    id: 'quality-sensors',
    name: 'Quality Control Sensors',
    description: 'Inline quality sensors measuring moisture, weight, and visual defects in real-time',
    type: 'production',
    category: 'sensor',
    criticality: 'high',
    location: { x: 500, y: 250, zone: 'production_floor' },
  },
  {
    id: 'production-cameras',
    name: 'Production Line Cameras',
    description: 'High-resolution cameras for quality inspection and process monitoring',
    type: 'production',
    category: 'sensor',
    criticality: 'medium',
    location: { x: 550, y: 200, zone: 'production_floor' },
  },

  // Support Systems
  {
    id: 'inventory-management',
    name: 'Inventory Management System',
    description: 'Automated inventory tracking for ingredients, packaging materials, and finished products',
    type: 'support',
    category: 'server',
    criticality: 'high',
    location: { x: 100, y: 400, zone: 'office' },
  },
  {
    id: 'hvac-control',
    name: 'HVAC Control System',
    description: 'Building automation system controlling temperature, humidity, and air quality',
    type: 'support',
    category: 'control_system',
    criticality: 'medium',
    location: { x: 700, y: 100, zone: 'server_room' },
  },
  {
    id: 'security-cameras',
    name: 'Security Camera System',
    description: 'Facility-wide security camera network with recording and monitoring capabilities',
    type: 'support',
    category: 'sensor',
    criticality: 'medium',
    location: { x: 750, y: 150, zone: 'server_room' },
  },
  {
    id: 'access-control',
    name: 'Access Control System',
    description: 'Electronic access control for secure areas with badge readers and biometric scanners',
    type: 'support',
    category: 'control_system',
    criticality: 'high',
    location: { x: 750, y: 200, zone: 'server_room' },
  },

  // Business Systems
  {
    id: 'erp-system',
    name: 'ERP System',
    description: 'Enterprise Resource Planning system managing finances, HR, and business operations',
    type: 'business',
    category: 'server',
    criticality: 'critical',
    location: { x: 50, y: 500, zone: 'server_room' },
  },
  {
    id: 'customer-orders',
    name: 'Customer Order Management',
    description: 'Web-based system for processing customer orders and delivery scheduling',
    type: 'business',
    category: 'server',
    criticality: 'high',
    location: { x: 150, y: 500, zone: 'server_room' },
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Coordination',
    description: 'System coordinating with suppliers for ingredient delivery and logistics',
    type: 'business',
    category: 'server',
    criticality: 'high',
    location: { x: 250, y: 500, zone: 'office' },
  },
  {
    id: 'employee-management',
    name: 'Employee Management System',
    description: 'HR system managing schedules, training records, and employee access permissions',
    type: 'business',
    category: 'server',
    criticality: 'medium',
    location: { x: 350, y: 500, zone: 'office' },
  },

  // Infrastructure
  {
    id: 'industrial-network-switch',
    name: 'Industrial Network Switch',
    description: 'Managed Ethernet switch connecting production floor devices',
    type: 'infrastructure',
    category: 'network',
    criticality: 'critical',
    location: { x: 400, y: 150, zone: 'production_floor' },
  },
  {
    id: 'corporate-firewall',
    name: 'Corporate Firewall',
    description: 'Next-generation firewall protecting corporate network from external threats',
    type: 'infrastructure',
    category: 'network',
    criticality: 'critical',
    location: { x: 450, y: 50, zone: 'server_room' },
  },
  {
    id: 'ot-firewall',
    name: 'OT Network Firewall',
    description: 'Specialized firewall separating operational technology from corporate network',
    type: 'infrastructure',
    category: 'network',
    criticality: 'critical',
    location: { x: 350, y: 100, zone: 'server_room' },
  },
  {
    id: 'domain-controller',
    name: 'Active Directory Server',
    description: 'Windows domain controller managing user authentication and network resources',
    type: 'infrastructure',
    category: 'server',
    criticality: 'critical',
    location: { x: 550, y: 450, zone: 'server_room' },
  },
  {
    id: 'wireless-access-points',
    name: 'Wireless Access Points',
    description: 'Enterprise WiFi access points providing wireless connectivity throughout the facility',
    type: 'infrastructure',
    category: 'network',
    criticality: 'medium',
    location: { x: 600, y: 100, zone: 'office' },
  },
  {
    id: 'data-historian',
    name: 'Data Historian Server',
    description: 'Industrial data historian collecting and storing time-series data from production systems',
    type: 'infrastructure',
    category: 'server',
    criticality: 'high',
    location: { x: 650, y: 450, zone: 'server_room' },
  },

  // External Systems
  {
    id: 'flour-supplier',
    name: 'Flour Supplier System',
    description: 'External supplier system for automated flour delivery scheduling and quality certificates',
    type: 'business',
    category: 'external_service',
    criticality: 'medium',
    location: { x: 100, y: 0, zone: 'external' },
  },
  {
    id: 'packaging-supplier',
    name: 'Packaging Supplier',
    description: 'Automated ordering system for packaging materials and supplies',
    type: 'business',
    category: 'external_service',
    criticality: 'medium',
    location: { x: 200, y: 0, zone: 'external' },
  },
  {
    id: 'quality-lab',
    name: 'External Quality Lab',
    description: 'Third-party quality testing laboratory for regulatory compliance testing',
    type: 'business',
    category: 'external_service',
    criticality: 'low',
    location: { x: 300, y: 0, zone: 'external' },
  }
];

// Predefined correct connections that students should identify
export const correctConnections: SystemConnection[] = [
  // Recipe Management to Production Controllers
  {
    id: 'conn-recipe-mixing',
    sourceId: 'recipe-management',
    targetId: 'mixing-station-controller',
    connectionType: 'network',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  {
    id: 'conn-recipe-baking',
    sourceId: 'recipe-management',
    targetId: 'baking-oven-controller',
    connectionType: 'network',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  
  // Temperature Sensors to Controllers
  {
    id: 'conn-temp-baking',
    sourceId: 'temperature-sensors',
    targetId: 'baking-oven-controller',
    connectionType: 'physical',
    dataFlow: 'unidirectional',
    direction: 'source_to_target',
    isCorrect: true,
    userCreated: false
  },
  
  // Quality Sensors to Production
  {
    id: 'conn-quality-packaging',
    sourceId: 'quality-sensors',
    targetId: 'packaging-line-automation',
    connectionType: 'network',
    dataFlow: 'unidirectional',
    direction: 'source_to_target',
    isCorrect: true,
    userCreated: false
  },
  
  // Network Infrastructure
  {
    id: 'conn-switch-mixing',
    sourceId: 'industrial-network-switch',
    targetId: 'mixing-station-controller',
    connectionType: 'physical',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  {
    id: 'conn-switch-baking',
    sourceId: 'industrial-network-switch',
    targetId: 'baking-oven-controller',
    connectionType: 'physical',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  
  // Firewall Connections
  {
    id: 'conn-ot-firewall-switch',
    sourceId: 'ot-firewall',
    targetId: 'industrial-network-switch',
    connectionType: 'physical',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  {
    id: 'conn-corp-firewall-ot-firewall',
    sourceId: 'corporate-firewall',
    targetId: 'ot-firewall',
    connectionType: 'physical',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  
  // Business Systems
  {
    id: 'conn-erp-inventory',
    sourceId: 'erp-system',
    targetId: 'inventory-management',
    connectionType: 'logical',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  {
    id: 'conn-supply-chain-inventory',
    sourceId: 'supply-chain',
    targetId: 'inventory-management',
    connectionType: 'logical',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  
  // External Connections
  {
    id: 'conn-flour-supplier-supply-chain',
    sourceId: 'flour-supplier',
    targetId: 'supply-chain',
    connectionType: 'network',
    dataFlow: 'bidirectional',
    isCorrect: true,
    userCreated: false
  },
  
  // Data Historian Connections
  {
    id: 'conn-historian-mixing',
    sourceId: 'data-historian',
    targetId: 'mixing-station-controller',
    connectionType: 'network',
    dataFlow: 'unidirectional',
    direction: 'target_to_source',
    isCorrect: true,
    userCreated: false
  }
];

// Data flows for educational purposes
export const dataFlows: DataflowInfo[] = [
  {
    id: 'df-recipe-data',
    name: 'Recipe Configuration Data',
    description: 'Cookie recipes with ingredient ratios, mixing times, and baking parameters',
    dataType: 'configuration',
    classification: 'operational',
    sensitivity: 'confidential',
    volume: 'low',
  },
  {
    id: 'df-sensor-readings',
    name: 'Temperature Sensor Readings',
    description: 'Real-time temperature measurements from production equipment',
    dataType: 'sensor_data',
    classification: 'operational',
    sensitivity: 'internal',
    volume: 'medium',
  },
  {
    id: 'df-quality-metrics',
    name: 'Quality Control Metrics',
    description: 'Product quality measurements and pass/fail indicators',
    dataType: 'sensor_data',
    classification: 'safety_critical',
    sensitivity: 'internal',
    volume: 'high',
  },
  {
    id: 'df-inventory-levels',
    name: 'Inventory Level Data',
    description: 'Current stock levels of ingredients and packaging materials',
    dataType: 'business_data',
    classification: 'business',
    sensitivity: 'internal',
    volume: 'low',
  },
  {
    id: 'df-production-commands',
    name: 'Production Control Commands',
    description: 'Start/stop commands and parameter adjustments to production equipment',
    dataType: 'control_commands',
    classification: 'safety_critical',
    sensitivity: 'restricted',
    volume: 'low',
  }
];

// Security threats for analysis
export const securityThreats: SecurityThreat[] = [
  {
    id: 'threat-unauthorized-access',
    name: 'Unauthorized Network Access',
    description: 'Attackers gaining unauthorized access to industrial control systems through network vulnerabilities',
    type: 'unauthorized_access',
    severity: 'critical',
    likelihood: 'possible',
    affectedSystems: ['mixing-station-controller', 'baking-oven-controller', 'industrial-network-switch'],
    mitigations: ['Network segmentation', 'Access control lists', 'VPN authentication']
  },
  {
    id: 'threat-recipe-theft',
    name: 'Recipe Data Theft',
    description: 'Theft of proprietary cookie recipes and production parameters',
    type: 'data_theft',
    severity: 'high',
    likelihood: 'unlikely',
    affectedSystems: ['recipe-management', 'data-historian'],
    mitigations: ['Data encryption', 'Access logging', 'Data loss prevention']
  },
  {
    id: 'threat-production-disruption',
    name: 'Production Line Disruption',
    description: 'Malicious or accidental disruption of production processes causing downtime',
    type: 'service_disruption',
    severity: 'high',
    likelihood: 'possible',
    affectedSystems: ['mixing-station-controller', 'baking-oven-controller', 'packaging-line-automation'],
    mitigations: ['Backup systems', 'Manual overrides', 'Change management']
  },
  {
    id: 'threat-malware-infection',
    name: 'Industrial Malware',
    description: 'Malware specifically targeting industrial control systems and causing equipment damage',
    type: 'malware',
    severity: 'critical',
    likelihood: 'unlikely',
    affectedSystems: ['mixing-station-controller', 'baking-oven-controller', 'recipe-management'],
    mitigations: ['Air gapping', 'Antivirus software', 'System hardening']
  },
  {
    id: 'threat-insider-threat',
    name: 'Malicious Insider',
    description: 'Employees or contractors with legitimate access using it for malicious purposes',
    type: 'insider_threat',
    severity: 'high',
    likelihood: 'unlikely',
    affectedSystems: ['recipe-management', 'erp-system', 'employee-management'],
    mitigations: ['Least privilege access', 'Activity monitoring', 'Background checks']
  }
];