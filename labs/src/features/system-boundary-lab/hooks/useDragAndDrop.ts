import { DragEndEvent } from '@dnd-kit/core'

interface UseDragAndDropProps {
  onAssignment: (elementId: string, areaType: 'functional' | 'operational', area: string) => void
}

export function useDragAndDrop({ onAssignment }: UseDragAndDropProps) {
  const handleDragStart = () => {
    document.body.classList.add('dragging')
  }

  const handleDragEnd = (event: DragEndEvent) => {
    document.body.classList.remove('dragging')
    
    const { active, over } = event
    
    if (over && active.data.current) {
      const { areaType, area } = active.data.current
      const elementId = over.id as string
      
      onAssignment(elementId, areaType, area)
    }
  }

  return {
    handleDragStart,
    handleDragEnd
  }
}