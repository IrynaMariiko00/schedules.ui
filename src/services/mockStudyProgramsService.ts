import { MOCK_STUDY_PROGRAMS } from '~/constants/mockStudyPrograms'
import { buildMockStudyProgramDetails } from '~/constants/mockStudyProgramDetails'
import { filterStudyPrograms, paginateStudyPrograms } from '~/lib/studyProgramFilters'
import type {
  StudyProgramDetailsDto,
  StudyProgramShortDto,
  StudyProgramsListParams,
} from '~/types/api/studyProgram'

const DEFAULT_PAGE_RECORDS = 20

export type MockStudyProgramsListResult = {
  studyPrograms: StudyProgramShortDto[]
  page: number
  pageRecords: number
  pagesCount: number
  total: number
}

export function getMockProgramsSource(): StudyProgramShortDto[] {
  return MOCK_STUDY_PROGRAMS.map((program) => ({ ...program }))
}

export function getMockStudyProgramsList(
  source: StudyProgramShortDto[],
  params?: StudyProgramsListParams,
): MockStudyProgramsListResult {
  const filtered = filterStudyPrograms(source, params ?? {})
  const paginated = paginateStudyPrograms(
    filtered,
    params?.page ?? 1,
    params?.pageRecords ?? DEFAULT_PAGE_RECORDS,
  )

  return {
    studyPrograms: paginated.items,
    page: paginated.page,
    pageRecords: paginated.pageRecords,
    pagesCount: paginated.pagesCount,
    total: paginated.total,
  }
}

export function getMockStudyProgramById(id: number): StudyProgramDetailsDto | null {
  const program = MOCK_STUDY_PROGRAMS.find((item) => item.id === id)
  if (!program) return null

  return buildMockStudyProgramDetails(id, program.name, program.hours)
}
