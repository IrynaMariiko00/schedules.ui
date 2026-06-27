import { useState, useEffect, useCallback } from 'react'
import { MOCK_LESSONS } from '~/constants/scheduleMocks'
import { USE_MOCK_DATA } from '~/env'
import { toIsoDateString } from '~/lib/dateUtils'
import { schedulesService } from '~/services/schedulesService'
import type { LessonDto } from '~/types/api/lesson'
import type { ScheduleDto, UpdateScheduleDto } from '~/types/api/schedule'

type Props = {
  open: boolean
  schedule: ScheduleDto | null
  onUpdate?: () => void
}

export const useScheduleDetails = ({ open, schedule, onUpdate }: Props) => {
  const [lessons, setLessons] = useState<LessonDto[]>([])
  const [loading, setLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [editForm, setEditForm] = useState<UpdateScheduleDto>({
    groupName: '',
    startDate: '',
    endDate: '',
  })

  const resetForm = useCallback(() => {
    if (schedule) {
      setEditForm({
        groupName: schedule.groupName,
        startDate: toIsoDateString(schedule.startDate),
        endDate: toIsoDateString(schedule.endDate),
      })
    }
    setError(null)
  }, [schedule])

  useEffect(() => {
    if (!open || !schedule) {
      setLessons([])
      setIsEditing(false)
      setError(null)
      return
    }

    const loadData = async () => {
      setLoading(true)
      try {
        resetForm()
        const data = USE_MOCK_DATA ? MOCK_LESSONS : await schedulesService.getLessons(schedule.id)
        setLessons(data)
      } catch (err) {
        setError('Не вдалося завантажити деталі розкладу')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [open, schedule, resetForm])

  const startEditing = () => {
    resetForm()
    setError(null)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    resetForm()
  }

  const updateHeaderField = (field: keyof UpdateScheduleDto, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const updateLessonHours = (lessonId: number, hours: number) => {
    setLessons((prev) =>
      prev.map((lesson) => (lesson.id === lessonId ? { ...lesson, hours } : lesson)),
    )
  }

  const saveEditing = async () => {
    if (!schedule) return

    setIsSaving(true)
    setError(null)
    try {
      await schedulesService.update(schedule.id, editForm)
      setIsEditing(false)
      onUpdate?.()
    } catch (err: any) {
      const message = err.response?.data?.message || 'Не вдалося оновити розклад'
      setError(message)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    lessons,
    loading,
    isSaving,
    isEditing,
    error,
    editForm,
    startEditing,
    cancelEditing,
    saveEditing,
    updateHeaderField,
    updateLessonHours,
  }
}
