// Re-export shared types that are used in this feature
export type {
  Assignment,
  FeedbackItem,
  DropZoneElement,
  CorrectAnswer,
  DraggableItem
} from '../../shared/types'

// Feature-specific types can be added here in the future
export interface LabProgress {
  totalElements: number
  completedElements: number
  correctAssignments: number
  percentage: number
}

export interface TutorialStep {
  target: string
  message: string
}