import { useState, useMemo } from 'react'
import type { Schedule } from '~/types/schedule'
import type { ScheduleDto } from '~/types/api/schedule'
import type { ScheduleRowActionHandlers } from '~/pages/HomePage/config/scheduleRowActions'

export const useScheduleTableState = (
  schedules: Schedule[],
  rowActions?: ScheduleRowActionHandlers,
) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scheduleDto = useMemo<ScheduleDto | null>(() => {
    if (!selectedSchedule) return null
    return {
      id: selectedSchedule.id,
      startDate: selectedSchedule.start,
      endDate: selectedSchedule.end,
      groupName: selectedSchedule.group,
      status: selectedSchedule.status,
      studyProgram: {
        id: selectedSchedule.id,
        name: selectedSchedule.program,
      },
    }
  }, [selectedSchedule])

  const handleEditClick = (id: number) => {
    const schedule = schedules.find((s) => s.id === id)
    if (schedule) {
      setSelectedSchedule(schedule)
      setIsModalOpen(true)
    }
    rowActions?.onEdit?.(id)
  }

  const enhancedActions: ScheduleRowActionHandlers = {
    ...rowActions,
    onEdit: handleEditClick,
  }

  return {
    isModalOpen,
    setIsModalOpen,
    scheduleDto,
    enhancedActions,
  }
}
