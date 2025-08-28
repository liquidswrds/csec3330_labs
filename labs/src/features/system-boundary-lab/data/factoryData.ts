import { DropZoneElement } from '../../../shared/types/index'

export const generateFactoryElements = (): DropZoneElement[] => [
  // Operational Zone 1 - Students need to identify the operational area type
  {
    id: 'external-ops-zone',
    name: 'Zone A',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'external' },
    type: 'operational-zone'
  },
  {
    id: 'flour-supplier',
    name: 'Flour & Sugar Supplier',
    description: 'Third-party vendor providing raw materials. Contains: delivery trucks, storage silos, supplier contracts',
    correctAnswer: { functional: 'logistics' },
    type: 'functional-zone'
  },
  {
    id: 'packaging-supplier',
    name: 'Packaging Materials Supplier',
    description: 'External vendor for boxes, labels, wrapping. Contains: delivery schedules, inventory tracking',
    correctAnswer: { functional: 'logistics' },
    type: 'functional-zone'
  },
  {
    id: 'quality-lab',
    name: 'Third-Party Testing Lab',
    description: 'Independent facility for product testing. Contains: testing equipment, certification processes',
    correctAnswer: { functional: 'quality' },
    type: 'functional-zone'
  },
  {
    id: 'distributors',
    name: 'Distribution Centers',
    description: 'Warehouses and shipping facilities. Contains: loading docks, tracking systems, delivery routes',
    correctAnswer: { functional: 'logistics' },
    type: 'functional-zone'
  },
  {
    id: 'regulatory-agency',
    name: 'Food Safety Regulatory Agency',
    description: 'Government oversight organization. Contains: inspection schedules, compliance documentation',
    correctAnswer: { functional: 'quality' },
    type: 'functional-zone'
  },

  // Operational Zone 2 - Students need to identify the operational area type
  {
    id: 'manufacturing-ops-zone',
    name: 'Zone B',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'manufacturing' },
    type: 'operational-zone'
  },
  
  // Ingredient Preparation Functional Area
  {
    id: 'ingredient-preparation-functional-zone',
    name: 'Ingredient Preparation Station',
    description: 'Raw material processing area. Contains: mixing bowls, measuring equipment, ingredient scales',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Mixing & Recipe Control Functional Area
  {
    id: 'mixing-recipe-functional-zone',
    name: 'Mixing & Recipe Control Station',
    description: 'Dough preparation area. Contains: industrial mixers, recipe terminals, batch tracking systems',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Cookie Forming Functional Area
  {
    id: 'cookie-forming-functional-zone',
    name: 'Cookie Forming Station',
    description: 'Shape creation area. Contains: molding machines, cutting equipment, conveyor belts',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Baking Operations Functional Area
  {
    id: 'baking-operations-functional-zone',
    name: 'Baking Operations Station',
    description: 'Heat treatment area. Contains: industrial ovens, temperature sensors, timing controls',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Cooling Systems Functional Area
  {
    id: 'cooling-systems-functional-zone',
    name: 'Cooling Systems Station',
    description: 'Temperature reduction area. Contains: cooling racks, ventilation systems, humidity controls',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Packaging & Finishing Functional Area
  {
    id: 'packaging-finishing-functional-zone',
    name: 'Packaging & Finishing Station',
    description: 'Final processing area. Contains: wrapping machines, labeling equipment, boxing systems',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Operational Zone 3 - Students need to identify the operational area type
  {
    id: 'support-ops-zone',
    name: 'Zone C',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'support' },
    type: 'operational-zone'
  },
  // Process Control Center Functional Area
  {
    id: 'process-control-functional-zone',
    name: 'Process Control Center',
    description: 'Central monitoring facility. Contains: SCADA systems, control panels, operator workstations',
    correctAnswer: { functional: 'control' },
    type: 'functional-zone'
  },
  // Quality Assurance Lab Functional Area
  {
    id: 'quality-assurance-functional-zone',
    name: 'Internal Quality Lab',
    description: 'On-site testing facility. Contains: testing equipment, sample storage, analysis workbenches',
    correctAnswer: { functional: 'quality' },
    type: 'functional-zone'
  },
  // Maintenance Operations Functional Area
  {
    id: 'maintenance-operations-functional-zone',
    name: 'Equipment Maintenance Shop',
    description: 'Repair and upkeep facility. Contains: tool storage, spare parts, maintenance schedules',
    correctAnswer: { functional: 'maintenance' },
    type: 'functional-zone'
  },

  // Operational Zone 4 - Students need to identify the operational area type
  {
    id: 'network-ops-zone',
    name: 'Zone D',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'network' },
    type: 'operational-zone'
  },
  // Data Center Infrastructure Functional Area
  {
    id: 'data-center-functional-zone',
    name: 'Data Center Infrastructure',
    description: 'Computing infrastructure facility. Contains: servers, storage systems, backup equipment',
    correctAnswer: { functional: 'control' },
    type: 'functional-zone'
  },
  // Network Infrastructure Functional Area
  {
    id: 'network-infrastructure-functional-zone',
    name: 'Network Infrastructure',
    description: 'Communication systems facility. Contains: switches, routers, firewalls, wireless access points',
    correctAnswer: { functional: 'control' },
    type: 'functional-zone'
  },

  // Environmental Monitoring Functional Area (Support Zone)
  {
    id: 'environmental-monitoring-functional-zone',
    name: 'Environmental Monitoring Station',
    description: 'Facility climate and safety monitoring. Contains: temperature sensors, humidity sensors, air quality monitors, leak detection systems',
    correctAnswer: { functional: 'monitoring' },
    type: 'functional-zone'
  },

  // Production Line Monitoring Functional Area (Manufacturing Zone)
  {
    id: 'production-monitoring-functional-zone',
    name: 'Production Line Monitoring Station',
    description: 'Real-time production oversight. Contains: conveyor belt sensors, product counters, quality cameras, throughput monitors',
    correctAnswer: { functional: 'monitoring' },
    type: 'functional-zone'
  },

  // Security Surveillance Functional Area (Network Zone)
  {
    id: 'security-surveillance-functional-zone',
    name: 'Security Surveillance Center',
    description: 'Facility security monitoring. Contains: CCTV cameras, access control readers, motion detectors, alarm systems',
    correctAnswer: { functional: 'monitoring' },
    type: 'functional-zone'
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