export interface Assignment {
  functional: string | null;
  operational: string | null;
}

export interface CorrectAnswer {
  functional: string | null;
  operational: string | null;
}

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
  type: 'system' | 'area' | 'network' | 'external' | 'operational-zone';
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
  { id: 'production', label: 'Production Function', color: 'green' },
  { id: 'control', label: 'Control Function', color: 'blue' },
  { id: 'monitoring', label: 'Monitoring Function', color: 'cyan' },
  { id: 'logistics', label: 'Logistics Function', color: 'orange' },
  { id: 'maintenance', label: 'Maintenance Function', color: 'purple' },
  { id: 'quality', label: 'Quality Assurance', color: 'red' },
] as const;

export const OPERATIONAL_AREAS = [
  { id: 'manufacturing', label: 'Manufacturing Operations', color: 'blue' },
  { id: 'support', label: 'Support Operations', color: 'purple' },
  { id: 'external', label: 'External Operations', color: 'red' },
  { id: 'network', label: 'Network Operations', color: 'orange' },
] as const;