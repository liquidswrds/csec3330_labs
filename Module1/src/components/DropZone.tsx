import { ReactNode } from 'react'
import { Paper, Group, Badge, ActionIcon, Box } from '@mantine/core'
import { useDroppable } from '@dnd-kit/core'
import { IconX } from '@tabler/icons-react'
import { Assignment, CorrectAnswer } from '../types'
import { FUNCTIONAL_COLORS, OPERATIONAL_COLORS, DEFAULT_COLORS } from '../utils/colors'

interface DropZoneProps {
  id: string
  children: ReactNode
  assignment?: Assignment
  correctAnswer?: CorrectAnswer
  onRemoveAssignment: (elementId: string, assignmentType: 'functional' | 'operational') => void
  minHeight?: number
}

export function DropZone({ 
  id, 
  children, 
  assignment, 
  correctAnswer,
  onRemoveAssignment, 
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

  return (
    <Paper
      ref={setNodeRef}
      p="md"
      radius="md"
      withBorder
      style={{
        minHeight,
        position: 'relative',
        borderColor: getBorderColor(),
        borderWidth: isOver ? 2 : 1,
        backgroundColor: getBackgroundColor(),
        transform: isOver ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease',
        cursor: isOver ? 'copy' : 'default',
      }}
    >
      {children}
      
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
                const isCorrect = !correctAnswer || assignment.functional === correctAnswer.functional;
                return (
                  <Badge
                    variant="filled"
                    color={isCorrect ? "green" : "red"}
                    size="sm"
                    rightSection={
                      <ActionIcon
                        size="xs"
                        color="white"
                        variant="transparent"
                        onClick={() => onRemoveAssignment(id, 'functional')}
                      >
                        <IconX size={12} />
                      </ActionIcon>
                    }
                    style={{ paddingRight: 4 }}
                  >
                    F: {assignment.functional}
                  </Badge>
                );
              })()
            )}
            {assignment?.operational && (
              (() => {
                const isCorrect = !correctAnswer || assignment.operational === correctAnswer.operational;
                return (
                  <Badge
                    variant="filled"
                    color={isCorrect ? "orange" : "red"}
                    size="sm"
                    rightSection={
                      <ActionIcon
                        size="xs"
                        color="white"
                        variant="transparent"
                        onClick={() => onRemoveAssignment(id, 'operational')}
                      >
                        <IconX size={12} />
                      </ActionIcon>
                    }
                    style={{ paddingRight: 4 }}
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