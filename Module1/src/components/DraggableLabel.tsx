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
    width: '100%',
    height: 'auto',
    padding: '12px 16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    textAlign: 'center' as const,
    transition: isDragging ? 'none' : 'all 0.2s ease',
  }

  return (
    <Badge
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant="filled"
      color={color}
      size="lg"
      radius="md"
      style={style}
    >
      {label}
    </Badge>
  )
}