import { ReactNode } from 'react'
import { Paper, Group, Badge, ActionIcon, Box } from '@mantine/core'
import { useDroppable } from '@dnd-kit/core'
import { IconX } from '@tabler/icons-react'
import { Assignment, CorrectAnswer } from '../../types/index'
import { FUNCTIONAL_COLORS, OPERATIONAL_COLORS, DEFAULT_COLORS } from '../../utils/colors'

interface DropZoneProps {
  id: string
  children: ReactNode
  assignment?: Assignment
  correctAnswer?: CorrectAnswer
  onRemoveAssignment: (elementId: string, assignmentType: 'functional' | 'operational') => void
  onKeyboardAssign?: () => void
  minHeight?: number
}

export function DropZone({ 
  id, 
  children, 
  assignment, 
  correctAnswer,
  onRemoveAssignment, 
  onKeyboardAssign,
  minHeight = 80
}: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id })

  const hasAssignment = assignment?.functional || assignment?.operational

  // Color mapping for different assignment types
  const getBackgroundColor = () => {
    if (isOver) return 'rgba(64, 192, 87, 0.1)'
    
    if (assignment?.operational && assignment.operational in OPERATIONAL_COLORS) {
      return OPERATIONAL_COLORS[assignment.operational as keyof typeof OPERATIONAL_COLORS].background
    }
    
    if (assignment?.functional && assignment.functional in FUNCTIONAL_COLORS) {
      return FUNCTIONAL_COLORS[assignment.functional as keyof typeof FUNCTIONAL_COLORS].background
    }
    
    return DEFAULT_COLORS.background
  }

  const getBorderColor = () => {
    if (isOver) return '#40c057'
    
    if (assignment?.operational && assignment.operational in OPERATIONAL_COLORS) {
      return OPERATIONAL_COLORS[assignment.operational as keyof typeof OPERATIONAL_COLORS].border
    }
    
    if (assignment?.functional && assignment.functional in FUNCTIONAL_COLORS) {
      return FUNCTIONAL_COLORS[assignment.functional as keyof typeof FUNCTIONAL_COLORS].border
    }
    
    return DEFAULT_COLORS.border
  }

  const dropZoneId = `dropzone-${id}`
  const ariaLabel = `Drop zone for ${id}. ${hasAssignment ? `Currently contains: ${assignment?.functional ? `Functional area: ${assignment.functional}` : ''} ${assignment?.operational ? `Operational area: ${assignment.operational}` : ''}` : 'Empty drop zone'}${onKeyboardAssign ? '. Press Enter to open classification assistant' : ''}`

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onKeyboardAssign) {
      event.preventDefault()
      onKeyboardAssign()
    }
  }

  return (
    <Paper
      ref={setNodeRef}
      p="md"
      radius="md"
      withBorder
      role="region"
      aria-label={ariaLabel}
      aria-describedby={`${dropZoneId}-status`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        minHeight,
        position: 'relative',
        borderColor: getBorderColor(),
        borderWidth: isOver ? 3 : 2,
        backgroundColor: getBackgroundColor(),
        transform: isOver ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease',
        cursor: isOver ? 'copy' : 'default',
        outline: 'none',
        boxShadow: isOver ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        ':focus': {
          outline: '3px solid #005fcc',
          outlineOffset: '2px'
        },
        ':focus-visible': {
          outline: '3px solid #005fcc',
          outlineOffset: '2px'
        }
      }}
    >
      {children}
      
      {/* Screen reader status */}
      <div id={`${dropZoneId}-status`} className="sr-only">
        {hasAssignment 
          ? `Contains assignments: ${assignment?.functional || ''} ${assignment?.operational || ''}` 
          : 'Empty drop zone ready for assignment'
        }
      </div>
      
      {hasAssignment && (
        <Box
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
          }}
        >
          <Group gap={4}>
            {assignment?.functional && (
              (() => {
                const isCorrect = !correctAnswer || 
                  ('functional' in correctAnswer && assignment.functional === correctAnswer.functional);
                return (
                  <Badge
                    variant="filled"
                    color={isCorrect ? "success" : "error"}
                    size="sm"
                    rightSection={
                      <ActionIcon
                        size="xs"
                        color="white"
                        variant="transparent"
                        onClick={() => onRemoveAssignment(id, 'functional')}
                        aria-label={`Remove functional assignment: ${assignment.functional}`}
                        title={`Remove functional assignment: ${assignment.functional}`}
                      >
                        <IconX size={12} aria-hidden="true" />
                      </ActionIcon>
                    }
                    style={{ paddingRight: 4 }}
                    aria-label={`Functional area assignment: ${assignment.functional}${isCorrect ? ' (correct)' : ' (incorrect)'}`}
                  >
                    F: {assignment.functional}
                  </Badge>
                );
              })()
            )}
            {assignment?.operational && (
              (() => {
                const isCorrect = !correctAnswer || 
                  ('operational' in correctAnswer && assignment.operational === correctAnswer.operational);
                return (
                  <Badge
                    variant="filled"
                    color={isCorrect ? "success" : "error"}
                    size="sm"
                    rightSection={
                      <ActionIcon
                        size="xs"
                        color="white"
                        variant="transparent"
                        onClick={() => onRemoveAssignment(id, 'operational')}
                        aria-label={`Remove operational assignment: ${assignment.operational}`}
                        title={`Remove operational assignment: ${assignment.operational}`}
                      >
                        <IconX size={12} aria-hidden="true" />
                      </ActionIcon>
                    }
                    style={{ paddingRight: 4 }}
                    aria-label={`Operational area assignment: ${assignment.operational}${isCorrect ? ' (correct)' : ' (incorrect)'}`}
                  >
                    O: {assignment.operational}
                  </Badge>
                );
              })()
            )}
          </Group>
        </Box>
      )}
    </Paper>
  )
}