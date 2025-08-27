import { DropZoneElement } from '../types'

export const generateFactoryElements = (): DropZoneElement[] => [
  // External Operations (Group 1) - Students need to identify this as "External"
  {
    id: 'external-ops-zone',
    name: 'External Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'external' },
    type: 'operational-zone'
  },
  {
    id: 'flour-supplier',
    name: 'Flour & Sugar Supplier',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'logistics' },
    type: 'functional-zone'
  },
  {
    id: 'packaging-supplier',
    name: 'Packaging Materials Supplier',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'logistics' },
    type: 'functional-zone'
  },
  {
    id: 'quality-lab',
    name: 'External Quality Lab',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'quality' },
    type: 'functional-zone'
  },
  {
    id: 'distributors',
    name: 'Distribution Centers',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'logistics' },
    type: 'functional-zone'
  },
  {
    id: 'regulatory-agency',
    name: 'Food Safety Regulatory Agency',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'quality' },
    type: 'functional-zone'
  },

  // Manufacturing Operations (Group 2) - Students need to identify this as "Manufacturing"
  {
    id: 'manufacturing-ops-zone',
    name: 'Manufacturing Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'manufacturing' },
    type: 'operational-zone'
  },
  
  // Ingredient Preparation Functional Area
  {
    id: 'ingredient-preparation-functional-zone',
    name: 'Ingredient Preparation',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Mixing & Recipe Control Functional Area
  {
    id: 'mixing-recipe-functional-zone',
    name: 'Mixing & Recipe Control',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Cookie Forming Functional Area
  {
    id: 'cookie-forming-functional-zone',
    name: 'Cookie Forming',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Baking Operations Functional Area
  {
    id: 'baking-operations-functional-zone',
    name: 'Baking Operations',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Cooling Systems Functional Area
  {
    id: 'cooling-systems-functional-zone',
    name: 'Cooling Systems',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Packaging & Finishing Functional Area
  {
    id: 'packaging-finishing-functional-zone',
    name: 'Packaging & Finishing',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'production' },
    type: 'functional-zone'
  },

  // Support Operations (Group 3) - Students need to identify this as "Support"
  {
    id: 'support-ops-zone',
    name: 'Support Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'support' },
    type: 'operational-zone'
  },
  // Process Control Center Functional Area
  {
    id: 'process-control-functional-zone',
    name: 'Process Control Center',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'control' },
    type: 'functional-zone'
  },
  // Quality Assurance Lab Functional Area
  {
    id: 'quality-assurance-functional-zone',
    name: 'Quality Assurance Lab',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'quality' },
    type: 'functional-zone'
  },
  // Maintenance Operations Functional Area
  {
    id: 'maintenance-operations-functional-zone',
    name: 'Maintenance Operations',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'maintenance' },
    type: 'functional-zone'
  },

  // Network Operations (Group 4) - Students need to identify this as "Network"
  {
    id: 'network-ops-zone',
    name: 'Network Operations Area',
    description: 'Drag operational area label here',
    correctAnswer: { operational: 'network' },
    type: 'operational-zone'
  },
  // Data Center Infrastructure Functional Area
  {
    id: 'data-center-functional-zone',
    name: 'Data Center Infrastructure',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'control' },
    type: 'functional-zone'
  },
  // Network Infrastructure Functional Area
  {
    id: 'network-infrastructure-functional-zone',
    name: 'Network Infrastructure',
    description: 'Drag functional area label here',
    correctAnswer: { functional: 'control' },
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