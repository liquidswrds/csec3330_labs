import { Badge } from '@mantine/core'
import { useDraggable } from '@dnd-kit/core'

interface DraggableLabelProps {
  id: string
  areaType: 'functional' | 'operational'
  area: string
  label: string
  color: string
}

export function DraggableLabel({ id, areaType, area, label, color }: DraggableLabelProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      areaType,
      area,
    },
  })

  const style = {
    ...(transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : {}),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none' as const,
    width: isDragging ? 'fit-content' : '100%',
    height: 'auto',
    padding: '12px 16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    textAlign: 'center' as const,
    transition: isDragging ? 'none' : 'all 0.2s ease',
    maxWidth: isDragging ? '250px' : 'none',
    whiteSpace: isDragging ? 'nowrap' : 'normal',
    boxShadow: isDragging ? '0 8px 16px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.08)',
    border: `2px solid transparent`,
    outline: 'none',
  }

  // Accessible label for screen readers
  const ariaLabel = `Draggable ${areaType} area: ${label}. Press space or enter to pick up, then use arrow keys to move, and space or enter to drop.`

  return (
    <Badge
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant="filled"
      color={color}
      size="lg"
      radius="md"
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-describedby={`${id}-instructions`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          // Trigger drag start behavior for keyboard users
          const event = new KeyboardEvent('keydown', {
            key: e.key,
            bubbles: true,
            cancelable: true
          })
          e.currentTarget.dispatchEvent(event)
        }
      }}
      style={{
        ...style,
        // Enhanced focus indication for keyboard users
        ':focus': {
          outline: '3px solid #005fcc',
          outlineOffset: '2px',
          borderColor: '#005fcc'
        },
        ':focus-visible': {
          outline: '3px solid #005fcc',
          outlineOffset: '2px',
          borderColor: '#005fcc'
        }
      }}
    >
      {label}
      {/* Hidden instructions for screen readers */}
      <span id={`${id}-instructions`} style={{ display: 'none' }}>
        Use arrow keys to navigate, space or enter to interact
      </span>
    </Badge>
  )
}