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
  { id: 'production', label: 'Production ', color: 'green' },
  { id: 'control', label: 'Control', color: 'blue' },
  { id: 'monitoring', label: 'Monitoring', color: 'cyan' },
  { id: 'logistics', label: 'Logistics', color: 'orange' },
  { id: 'maintenance', label: 'Maintenance', color: 'purple' },
  { id: 'quality', label: 'Quality Assurance', color: 'red' },
] as const;

export const OPERATIONAL_AREAS = [
  { id: 'manufacturing', label: 'Manufacturing', color: 'blue' },
  { id: 'support', label: 'Support', color: 'purple' },
  { id: 'external', label: 'External', color: 'red' },
  { id: 'network', label: 'Network', color: 'orange' },
] as const;