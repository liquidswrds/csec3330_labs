import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { Assignment, FeedbackItem } from '../../../shared/types/index'
import { generateFactoryElements } from '../data/factoryData'

export function useLabState() {
  const [assignments, setAssignments] = useState<{ [key: string]: Assignment }>({})
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)
  const [completedElements, setCompletedElements] = useState<Set<string>>(new Set())

  const factoryElements = generateFactoryElements()

  const handleAssignment = (elementId: string, areaType: 'functional' | 'operational', area: string) => {
    setAssignments(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        [areaType]: area,
      },
    }))

    // Check if element is now completed and provide immediate feedback
    const element = factoryElements.find(el => el.id === elementId)
    if (element) {
      const currentAssignment = { ...assignments[elementId], [areaType]: area }
      const { isComplete, isCorrect } = checkElementCompletion(element, currentAssignment)
      
      if (isComplete) {
        if (isCorrect && !completedElements.has(elementId)) {
          setCompletedElements(prev => new Set([...prev, elementId]))
          notifications.show({
            title: '✅ Correct!',
            message: `You've correctly identified all areas for ${element.name}`,
            color: 'green',
          })
        } else if (!isCorrect) {
          // Remove from completed if it was previously correct but now wrong
          setCompletedElements(prev => {
            const newSet = new Set(prev)
            newSet.delete(elementId)
            return newSet
          })
          notifications.show({
            title: '❌ Incorrect',
            message: `The assignment for ${element.name} is not correct. Try again!`,
            color: 'red',
          })
        }
      } else {
        // Partial assignment - provide encouraging feedback
        const requiredTypes = []
        if ('functional' in element.correctAnswer) requiredTypes.push('functional')
        if ('operational' in element.correctAnswer) requiredTypes.push('operational')
        
        notifications.show({
          title: 'Assignment Added',
          message: `${element.name} needs ${requiredTypes.join(' and ')} area assignments`,
          color: 'blue',
        })
      }
    }
  }

  const removeAssignment = (elementId: string, assignmentType: 'functional' | 'operational') => {
    setAssignments(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        [assignmentType]: null,
      },
    }))

    // Remove from completed if no longer complete
    setCompletedElements(prev => {
      const newSet = new Set(prev)
      newSet.delete(elementId)
      return newSet
    })
  }

  const checkElementCompletion = (element: any, assignment: Assignment): { isComplete: boolean; isCorrect: boolean } => {
    const requiredFunctional = 'functional' in element.correctAnswer
    const requiredOperational = 'operational' in element.correctAnswer
    
    let isComplete = false
    let isCorrect = false
    
    if (requiredFunctional && requiredOperational) {
      isComplete = assignment.functional !== null && assignment.operational !== null
      isCorrect = isComplete && 
                  assignment.functional === element.correctAnswer.functional &&
                  assignment.operational === element.correctAnswer.operational
    } else if (requiredFunctional) {
      isComplete = assignment.functional !== null
      isCorrect = isComplete && assignment.functional === element.correctAnswer.functional
    } else if (requiredOperational) {
      isComplete = assignment.operational !== null
      isCorrect = isComplete && assignment.operational === element.correctAnswer.operational
    }
    
    return { isComplete, isCorrect }
  }

  const analyzeAssignments = () => {
    const newFeedback: FeedbackItem[] = []
    let totalCorrect = 0
    let totalAttempted = 0

    factoryElements.forEach(element => {
      const assignment = assignments[element.id]
      if (!assignment) return

      const hasAssignment = assignment.functional || assignment.operational
      if (!hasAssignment) return

      totalAttempted++

      const functionalCorrect = !('functional' in element.correctAnswer) || 
                                assignment.functional === element.correctAnswer.functional
      const operationalCorrect = !('operational' in element.correctAnswer) || 
                                 assignment.operational === element.correctAnswer.operational

      if (functionalCorrect && operationalCorrect) {
        totalCorrect++
        newFeedback.push({
          text: `✅ ${element.name}: Correctly identified`,
          correct: true,
          type: 'correct'
        })
      } else {
        const issues: string[] = []
        if ('functional' in element.correctAnswer && !functionalCorrect) {
          issues.push('functional area')
        }
        if ('operational' in element.correctAnswer && !operationalCorrect) {
          issues.push('operational area')
        }
        
        newFeedback.push({
          text: `❌ ${element.name}: Incorrect ${issues.join(' and ')}`,
          correct: false,
          type: 'incorrect'
        })
      }
    })

    const unassignedElements = factoryElements.filter(el => {
      const assignment = assignments[el.id]
      return !assignment || (!assignment.functional && !assignment.operational)
    })

    unassignedElements.forEach(element => {
      newFeedback.push({
        text: `⚠️ ${element.name}: Not yet assigned`,
        correct: false,
        type: 'incomplete'
      })
    })

    setFeedback(newFeedback)

    if (totalAttempted > 0) {
      const percentage = Math.round((totalCorrect / totalAttempted) * 100)
      notifications.show({
        title: 'Analysis Complete',
        message: `Score: ${totalCorrect}/${totalAttempted} (${percentage}%)`,
        color: percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red',
      })
    }
  }

  const resetLab = () => {
    setAssignments({})
    setFeedback([])
    setShowCorrectAnswers(false)
    setCompletedElements(new Set())
    notifications.show({
      title: 'Lab Reset',
      message: 'All assignments have been cleared',
      color: 'blue',
    })
  }

  // New method for keyboard assignment modal
  const handleKeyboardAssignment = (elementId: string, assignment: { functional?: string; operational?: string }) => {
    setAssignments(prev => ({
      ...prev,
      [elementId]: {
        functional: assignment.functional || null,
        operational: assignment.operational || null,
      },
    }))

    // Provide feedback for keyboard assignment
    const element = factoryElements.find(el => el.id === elementId)
    if (element) {
      const assignmentToCheck = {
        functional: assignment.functional || null,
        operational: assignment.operational || null,
      }
      const { isComplete, isCorrect } = checkElementCompletion(element, assignmentToCheck)
      
      if (isComplete) {
        if (isCorrect && !completedElements.has(elementId)) {
          setCompletedElements(prev => new Set([...prev, elementId]))
          notifications.show({
            title: '✅ Assignment Complete!',
            message: `Correctly assigned areas for ${element.name}`,
            color: 'green',
          })
        } else if (!isCorrect) {
          notifications.show({
            title: '❌ Assignment Incorrect',
            message: `Please review the assignments for ${element.name}`,
            color: 'red',
          })
        }
      } else {
        notifications.show({
          title: 'ℹ️ Assignment Updated',
          message: `Updated assignments for ${element.name}`,
          color: 'blue',
        })
      }
    }
  }

  return {
    assignments,
    feedback,
    showCorrectAnswers,
    completedElements,
    factoryElements,
    setShowCorrectAnswers,
    handleAssignment,
    handleKeyboardAssignment,
    removeAssignment,
    analyzeAssignments,
    resetLab
  }
}