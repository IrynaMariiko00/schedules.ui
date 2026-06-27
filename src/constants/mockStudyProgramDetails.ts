import type { StudyProgramDetailsDto, StudyProgramSubjectDto } from '~/types/api/studyProgram'

export const MOCK_STUDY_PROGRAM_SUBJECTS: Omit<
  StudyProgramSubjectDto,
  'id' | 'studyProgramId'
>[] = [
  { name: '- організація трудових відносин в умовах воєнного стану', hours: 3, order: 1 },
  { name: '-Особливості переведення та зміни істотних умов праці', hours: 3, order: 2 },
  {
    name: '-режим роботи. Встановлення та облік часу роботи та часу відпочинку',
    hours: 2,
    order: 3,
  },
  { name: 'Залучення до роботи деяких категорій працівників', hours: 2, order: 4 },
  { name: 'Організація роботи служби охорони праці на підприємствах.', hours: 4, order: 5 },
  {
    name: 'Надзвичайні ситуації воєнного часу на підприємствах : види та джерела виникнення',
    hours: 4,
    order: 6,
  },
  { name: 'Дії працівників в умовах надзвичайних ситуацій воєнного характеру', hours: 4, order: 7 },
  {
    name: 'Порядок і правила надання до медичної допомоги при різних типах ушкоджень в умовах воєнного стану',
    hours: 6,
    order: 8,
  },
  { name: 'Підсумкове заняття', hours: 2, order: 9 },
]

export function buildMockStudyProgramDetails(
  id: number,
  name: string,
  hours?: number,
): StudyProgramDetailsDto {
  const subjects: StudyProgramSubjectDto[] = MOCK_STUDY_PROGRAM_SUBJECTS.map((subject, index) => ({
    ...subject,
    id: id * 100 + index + 1,
    studyProgramId: id,
    order: index + 1,
  }))

  const totalHours = hours ?? subjects.reduce((sum, subject) => sum + subject.hours, 0)

  return {
    id,
    name,
    hours: totalHours,
    subjects,
  }
}
