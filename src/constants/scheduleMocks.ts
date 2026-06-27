import type { LessonDto } from '~/types/api/lesson'

export const MOCK_SUBJECTS_NAMES: Record<number, string> = {
  1: 'Організація трудових відносин в умовах воєнного стану',
  2: 'Особливості переведення та зміни істотних умов праці',
  3: 'Режим роботи. Встановлення та облік часу роботи та часу відпочинку',
  4: 'Залучення до роботи деяких категорій працівників',
  5: 'Організація роботи служби охорони праці на підприємствах',
  6: 'Надзвичайні ситуації воєнного часу на підприємствах: види та джерела виникнення',
  7: 'Дії працівників в умовах надзвичайних ситуацій воєнного характеру',
  8: 'Порядок і правила надання до медичної допомоги при різних типах ушкоджень в умовах воєнного стану',
  9: 'Підсумкове заняття',
}

const MOCK_LESSONS_BY_SCHEDULE: Record<number, LessonDto[]> = {
  246: [
    {
      id: 101,
      date: '2025-01-13',
      schedule_id: 246,
      subject_id: 1,
      hours: 2,
      order: 1,
      type: 'п',
      teacher: { id: 1, displayName: 'ШТОГРИН Л. В.' },
    },
    {
      id: 102,
      date: '2025-01-13',
      schedule_id: 246,
      subject_id: 1,
      hours: 1,
      order: 2,
      type: 'п',
      teacher: { id: 3, displayName: 'КОВАЛЕНКО О. П.' },
    },
    {
      id: 103,
      date: '2025-01-13',
      schedule_id: 246,
      subject_id: 5,
      hours: 2,
      order: 1,
      type: 'п',
      teacher: { id: 2, displayName: 'ГОЛОВЕЦЬКА Л. Є.' },
    },
    {
      id: 104,
      date: '2025-01-14',
      schedule_id: 246,
      subject_id: 2,
      hours: 3,
      order: 1,
      type: 'п',
      teacher: { id: 1, displayName: 'ШТОГРИН Л. В.' },
    },
    {
      id: 105,
      date: '2025-01-15',
      schedule_id: 246,
      subject_id: 3,
      hours: 2,
      order: 1,
      type: 'п',
      teacher: { id: 3, displayName: 'КОВАЛЕНКО О. П.' },
    },
    {
      id: 106,
      date: '2025-01-15',
      schedule_id: 246,
      subject_id: 4,
      hours: 2,
      order: 1,
      type: 'п',
      teacher: { id: 3, displayName: 'КОВАЛЕНКО О. П.' },
    },
    {
      id: 107,
      date: '2025-01-16',
      schedule_id: 246,
      subject_id: 6,
      hours: 4,
      order: 1,
      type: 'п',
      teacher: { id: 2, displayName: 'ГОЛОВЕЦЬКА Л. Є.' },
    },
    {
      id: 108,
      date: '2025-01-16',
      schedule_id: 246,
      subject_id: 7,
      hours: 4,
      order: 1,
      type: 'п',
      teacher: { id: 2, displayName: 'ГОЛОВЕЦЬКА Л. Є.' },
    },
    {
      id: 109,
      date: '2025-01-16',
      schedule_id: 246,
      subject_id: 8,
      hours: 4,
      order: 1,
      type: 'п',
      teacher: { id: 4, displayName: 'МЕЛЬНИК І. С.' },
    },
    {
      id: 110,
      date: '2025-01-16',
      schedule_id: 246,
      subject_id: 9,
      hours: 2,
      order: 1,
      type: 'п',
      teacher: { id: 1, displayName: 'ШТОГРИН Л. В.' },
    },
  ],
  245: [
    {
      id: 201,
      date: '2024-12-24',
      schedule_id: 245,
      subject_id: 1,
      hours: 3,
      order: 1,
      type: 'п',
      teacher: { id: 1, displayName: 'ШТОГРИН Л. В.' },
    },
    {
      id: 202,
      date: '2024-12-25',
      schedule_id: 245,
      subject_id: 2,
      hours: 3,
      order: 1,
      type: 'п',
      teacher: { id: 2, displayName: 'ГОЛОВЕЦЬКА Л. Є.' },
    },
    {
      id: 203,
      date: '2024-12-26',
      schedule_id: 245,
      subject_id: 5,
      hours: 4,
      order: 1,
      type: 'п',
      teacher: { id: 3, displayName: 'КОВАЛЕНКО О. П.' },
    },
  ],
}

export const MOCK_LESSONS = MOCK_LESSONS_BY_SCHEDULE[246]

export function getMockLessonsForSchedule(scheduleId: number): LessonDto[] {
  const lessons = MOCK_LESSONS_BY_SCHEDULE[scheduleId]
  if (!lessons)
    return MOCK_LESSONS_BY_SCHEDULE[246].map((lesson) => ({ ...lesson, schedule_id: scheduleId }))

  return lessons.map((lesson) => ({ ...lesson }))
}

export function getSubjectNameById(subjectId: number): string {
  return MOCK_SUBJECTS_NAMES[subjectId] ?? `Предмет №${subjectId}`
}
