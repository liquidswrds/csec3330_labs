export interface Assignment {
  functional: string | null;
  operational: string | null;
}

export interface FunctionalAnswer {
  functional: string;
}

export interface OperationalAnswer {
  operational: string;
}

export type CorrectAnswer = FunctionalAnswer | OperationalAnswer;

export interface DraggableItem {
  id: string;
  areaType: 'functional' | 'operational';
  area: string;
  label: string;
}

export interface DropZoneElement {
  id: string;
  name: string;
  description?: string;
  correctAnswer: CorrectAnswer;
  type: 'system' | 'area' | 'network' | 'external' | 'operational-zone' | 'functional-zone';
}

export interface FeedbackItem {
  text: string;
  correct: boolean;
  type: 'correct' | 'incorrect' | 'incomplete';
}

export interface TutorialStep {
  target: string;
  message: string;
}

export const FUNCTIONAL_AREAS = [
  { 
    id: 'production', 
    label: 'Production', 
    color: 'green',
    description: 'Direct manufacturing processes that create or modify products. Includes mixing, forming, baking, cooling, and packaging operations.'
  },
  { 
    id: 'control', 
    label: 'Control', 
    color: 'blue',
    description: 'Systems that regulate and manage operational processes. Includes process control centers, SCADA systems, and automation equipment.'
  },
  { 
    id: 'monitoring', 
    label: 'Monitoring', 
    color: 'cyan',
    description: 'Systems that observe, measure, and report on operational conditions without directly controlling them. Includes sensors, cameras, and data collection systems.'
  },
  { 
    id: 'logistics', 
    label: 'Logistics', 
    color: 'orange',
    description: 'Supply chain and material handling operations. Includes receiving, shipping, inventory management, and coordination with external suppliers.'
  },
  { 
    id: 'maintenance', 
    label: 'Maintenance', 
    color: 'purple',
    description: 'Equipment upkeep and repair activities. Includes preventive maintenance, troubleshooting, spare parts management, and equipment lifecycle management.'
  },
  { 
    id: 'quality', 
    label: 'Quality Assurance', 
    color: 'red',
    description: 'Testing, inspection, and compliance activities. Includes product testing, regulatory compliance, certification processes, and quality documentation.'
  },
] as const;

export const OPERATIONAL_AREAS = [
  { 
    id: 'manufacturing', 
    label: 'Manufacturing', 
    color: 'blue',
    description: 'Core production operations directly involved in creating products. Contains production lines, process equipment, and immediate production support systems.'
  },
  { 
    id: 'support', 
    label: 'Support', 
    color: 'purple',
    description: 'Auxiliary operations that enable manufacturing but don\'t directly create products. Includes maintenance, internal quality labs, and process control centers.'
  },
  { 
    id: 'external', 
    label: 'External', 
    color: 'red',
    description: 'Third-party entities and outside-the-fence operations. Includes suppliers, distributors, regulatory agencies, and external service providers.'
  },
  { 
    id: 'network', 
    label: 'Network', 
    color: 'orange',
    description: 'Information technology infrastructure and communications systems. Includes data centers, network equipment, and cybersecurity systems.'
  },
] as const;

export type FunctionalAreaType = (typeof FUNCTIONAL_AREAS)[number];
export type OperationalAreaType = (typeof OPERATIONAL_AREAS)[number];