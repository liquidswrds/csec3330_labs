import { DropZoneElement } from '../types'

export const generateFactoryElements = (): DropZoneElement[] => [
  // External Operations (Group 1) - Students need to identify this as "External"
  {
    id: 'external-ops-zone',
    name: 'External Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { functional: 'logistics', operational: 'external' },
    type: 'operational-zone'
  },
  {
    id: 'flour-supplier',
    name: 'Flour & Sugar Supplier',
    description: 'Bulk ingredient suppliers with EDI ordering',
    correctAnswer: { functional: 'logistics', operational: 'external' },
    type: 'external'
  },
  {
    id: 'packaging-supplier',
    name: 'Packaging Materials Supplier',
    description: 'Film, boxes, labels with RFID tracking',
    correctAnswer: { functional: 'logistics', operational: 'external' },
    type: 'external'
  },
  {
    id: 'quality-lab',
    name: 'External Quality Lab',
    description: 'Third-party microbiological testing',
    correctAnswer: { functional: 'quality', operational: 'external' },
    type: 'external'
  },
  {
    id: 'distributors',
    name: 'Distribution Centers',
    description: 'Temperature-controlled logistics network',
    correctAnswer: { functional: 'logistics', operational: 'external' },
    type: 'external'
  },
  {
    id: 'regulatory-agency',
    name: 'Food Safety Regulatory Agency',
    description: 'FDA/USDA inspection and compliance',
    correctAnswer: { functional: 'quality', operational: 'external' },
    type: 'external'
  },

  // Manufacturing Operations (Group 2) - Students need to identify this as "Manufacturing"
  {
    id: 'manufacturing-ops-zone',
    name: 'Manufacturing Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'operational-zone'
  },
  
  // Ingredient Preparation Area
  {
    id: 'ingredient-prep-area',
    name: 'Ingredient Preparation Area',
    description: 'Central staging area for ingredient processing',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'area'
  },
  {
    id: 'flour-silos',
    name: 'Flour Storage Silos',
    description: 'Bulk storage tanks with pneumatic delivery',
    correctAnswer: { functional: 'logistics', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'ingredient-scales',
    name: 'Automated Weighing Systems',
    description: 'High-precision digital scales with batch control',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'moisture-sensors',
    name: 'Ingredient Moisture Sensors',
    description: 'Real-time humidity monitoring probes',
    correctAnswer: { functional: 'monitoring', operational: 'manufacturing' },
    type: 'system'
  },

  // Mixing Area
  {
    id: 'mixing-area',
    name: 'Dough Mixing Area',
    description: 'High-capacity dough preparation zone',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'area'
  },
  {
    id: 'industrial-mixers',
    name: 'Industrial Dough Mixers',
    description: 'Variable-speed planetary mixers (500L capacity)',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'recipe-control',
    name: 'Recipe Management System',
    description: 'Automated ingredient dosing control',
    correctAnswer: { functional: 'control', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'mixing-sensors',
    name: 'Mixing Time & Speed Monitors',
    description: 'Torque and consistency measurement sensors',
    correctAnswer: { functional: 'monitoring', operational: 'manufacturing' },
    type: 'system'
  },

  // Forming Area
  {
    id: 'forming-area',
    name: 'Cookie Forming Area',
    description: 'Automated cookie shaping and cutting zone',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'area'
  },
  {
    id: 'forming-machines',
    name: 'Cookie Forming Machines',
    description: 'Rotary molding and wire-cutting stations',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'shape-inspection',
    name: 'Shape Quality Cameras',
    description: 'Machine vision systems for dimensional check',
    correctAnswer: { functional: 'monitoring', operational: 'manufacturing' },
    type: 'system'
  },

  // Baking Area
  {
    id: 'baking-area',
    name: 'Industrial Baking Area',
    description: 'High-temperature continuous baking zone',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'area'
  },
  {
    id: 'tunnel-ovens',
    name: 'Continuous Tunnel Ovens',
    description: 'Multi-zone gas-fired ovens (400°F-450°F)',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'oven-controls',
    name: 'Oven Temperature Control',
    description: 'Zone-based heating and airflow control',
    correctAnswer: { functional: 'control', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'temperature-monitoring',
    name: 'Multi-Zone Temperature Sensors',
    description: 'Infrared and thermocouple monitoring',
    correctAnswer: { functional: 'monitoring', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'conveyor-sensors',
    name: 'Conveyor Speed Monitors',
    description: 'Belt speed and tension monitoring systems',
    correctAnswer: { functional: 'monitoring', operational: 'manufacturing' },
    type: 'system'
  },

  // Cooling Area
  {
    id: 'cooling-area',
    name: 'Cookie Cooling Area',
    description: 'Controlled cooling and conditioning zone',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'area'
  },
  {
    id: 'cooling-conveyors',
    name: 'Cooling Conveyor Systems',
    description: 'Multi-tier spiral cooling belts',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'cooling-fans',
    name: 'Industrial Cooling Fans',
    description: 'Variable-speed air circulation systems',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },

  // Packaging Area
  {
    id: 'packaging-area',
    name: 'Automated Packaging Line',
    description: 'High-speed packaging and labeling zone',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'area'
  },
  {
    id: 'wrapping-machines',
    name: 'Cookie Wrapping Machines',
    description: 'Flow-wrap and heat-seal packaging systems',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'boxing-machines',
    name: 'Automated Boxing Systems',
    description: 'Robotic case packing and sealing',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'weight-checkers',
    name: 'Package Weight Verification',
    description: 'High-speed checkweigher systems',
    correctAnswer: { functional: 'monitoring', operational: 'manufacturing' },
    type: 'system'
  },
  {
    id: 'date-coding',
    name: 'Date/Lot Code Printers',
    description: 'Inkjet and laser marking systems',
    correctAnswer: { functional: 'production', operational: 'manufacturing' },
    type: 'system'
  },

  // Support Operations (Group 3) - Students need to identify this as "Support"
  {
    id: 'support-ops-zone',
    name: 'Support Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { functional: 'control', operational: 'support' },
    type: 'operational-zone'
  },
  {
    id: 'control-room',
    name: 'Central Control Room',
    description: 'Main operations center',
    correctAnswer: { functional: 'control', operational: 'support' },
    type: 'area'
  },
  {
    id: 'hmi-stations',
    name: 'Operator HMI Stations',
    correctAnswer: { functional: 'control', operational: 'support' },
    type: 'system'
  },
  {
    id: 'scada-system',
    name: 'SCADA System',
    correctAnswer: { functional: 'control', operational: 'support' },
    type: 'system'
  },
  {
    id: 'production-database',
    name: 'Production Database Server',
    correctAnswer: { functional: 'control', operational: 'support' },
    type: 'system'
  },
  {
    id: 'quality-lab-internal',
    name: 'On-Site Quality Lab',
    correctAnswer: { functional: 'quality', operational: 'support' },
    type: 'area'
  },
  {
    id: 'lab-equipment',
    name: 'Testing Equipment',
    correctAnswer: { functional: 'quality', operational: 'support' },
    type: 'system'
  },
  {
    id: 'sample-tracking',
    name: 'Sample Tracking System',
    correctAnswer: { functional: 'quality', operational: 'support' },
    type: 'system'
  },
  {
    id: 'maintenance-shop',
    name: 'Maintenance Workshop',
    correctAnswer: { functional: 'maintenance', operational: 'support' },
    type: 'area'
  },
  {
    id: 'spare-parts',
    name: 'Spare Parts Inventory',
    correctAnswer: { functional: 'maintenance', operational: 'support' },
    type: 'system'
  },
  {
    id: 'cmms',
    name: 'Equipment Maintenance Database',
    correctAnswer: { functional: 'maintenance', operational: 'support' },
    type: 'system'
  },

  // Network Operations (Group 4) - Students need to identify this as "Network"
  {
    id: 'network-ops-zone',
    name: 'Network Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { functional: 'control', operational: 'network' },
    type: 'operational-zone'
  },
  {
    id: 'server-room',
    name: 'Data Center/Server Room',
    correctAnswer: { functional: 'control', operational: 'network' },
    type: 'area'
  },
  {
    id: 'ot-network',
    name: 'OT Production Network',
    description: 'Isolated operational technology network',
    correctAnswer: { functional: 'control', operational: 'network' },
    type: 'network'
  },
  {
    id: 'it-network',
    name: 'IT Corporate Network',
    description: 'Business systems, internet access',
    correctAnswer: { functional: 'control', operational: 'network' },
    type: 'network'
  },
  {
    id: 'wireless-network',
    name: 'Wireless Network Infrastructure',
    correctAnswer: { functional: 'control', operational: 'network' },
    type: 'network'
  },
  {
    id: 'firewall-systems',
    name: 'Network Security Firewalls',
    correctAnswer: { functional: 'control', operational: 'network' },
    type: 'system'
  },
  {
    id: 'network-switches',
    name: 'Industrial Network Switches',
    correctAnswer: { functional: 'control', operational: 'network' },
    type: 'system'
  },
]

export const getElementColor = (type: string): string => {
  switch (type) {
    case 'external':
      return 'red'
    case 'area':
      return 'blue'
    case 'system':
      return 'blue'
    case 'network':
      return 'orange'
    default:
      return 'gray'
  }
}