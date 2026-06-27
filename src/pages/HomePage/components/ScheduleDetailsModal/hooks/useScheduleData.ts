import { useMemo } from 'react'
import type { TableHeaderColumn } from '~/components/ui/TableHeader'
import type { LessonDto } from '~/types/api/lesson'
import type { ScheduleDto } from '~/types/api/schedule'
import { formatDateDisplay, getBusinessDatesInRange } from '~/utils/dateHelpers'

export const useScheduleData = (lessons: LessonDto[], schedule: ScheduleDto) => {
  const dateColumns = useMemo(
    () => getBusinessDatesInRange(schedule.startDate, schedule.endDate),
    [schedule.startDate, schedule.endDate],
  )

  const { groupedData, subjectIds, totalHours, dailyTotals } = useMemo(() => {
    const map: Record<number, Record<string, LessonDto[]>> = {}
    const daily: Record<string, number> = {}
    let total = 0

    lessons.forEach((lesson) => {
      total += lesson.hours

      if (!map[lesson.subject_id]) map[lesson.subject_id] = {}
      if (!map[lesson.subject_id][lesson.date]) map[lesson.subject_id][lesson.date] = []
      map[lesson.subject_id][lesson.date].push(lesson)

      daily[lesson.date] = (daily[lesson.date] || 0) + lesson.hours
    })

    const ids = Array.from(new Set(lessons.map((l) => l.subject_id))).sort((a, b) => a - b)

    return {
      groupedData: map,
      subjectIds: ids,
      totalHours: total,
      dailyTotals: daily,
    }
  }, [lessons])

  const columns: TableHeaderColumn[] = useMemo(
    () => [
      { key: 'index', label: '№', className: 'w-14 text-center border-r border-border/50' },
      {
        key: 'subject',
        label: 'Предмети',
        className: 'w-[20vw] min-w-[200px] text-left border-r border-border/50',
      },
      { key: 'hours', label: 'К-ть год.', className: 'w-24 text-center border-r border-border/50' },
      ...dateColumns.map((date) => ({
        key: `date-${date}`,
        label: formatDateDisplay(date),
        className: 'min-w-[140px] text-center',
      })),
      { key: 'teachers', label: 'Викладачі (всього)', className: 'min-w-[180px] text-left' },
    ],
    [dateColumns],
  )

  return { dateColumns, columns, groupedData, subjectIds, totalHours, dailyTotals }
}
