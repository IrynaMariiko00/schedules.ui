import { useEffect, useState } from 'react'
import { ModalLayout } from '~/components/ui/ModalLayout'
import { FormErrorMessage } from '~/components/ui/FormErrorMessage'
import { USE_MOCK_DATA } from '~/env'
import { getMockStudyProgramById } from '~/services/mockStudyProgramsService'
import { studyProgramsService } from '~/services/studyProgramsService'
import type { StudyProgramDetailsDto } from '~/types/api/studyProgram'
import { StudyProgramSubjectsTable } from './components/StudyProgramSubjectsTable'
import { Button } from '~/components/ui/Button'

type StudyProgramDetailsModalProps = {
  open: boolean
  programId: number | null
  onClose: () => void
}

export const StudyProgramDetailsModal = ({
  open,
  programId,
  onClose,
}: StudyProgramDetailsModalProps) => {
  const [details, setDetails] = useState<StudyProgramDetailsDto | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !programId) {
      setDetails(null)
      setError(null)
      return
    }

    const loadDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = USE_MOCK_DATA
          ? getMockStudyProgramById(programId)
          : await studyProgramsService.getById(programId)

        if (!data) {
          setError('Програму не знайдено')
          setDetails(null)
          return
        }

        setDetails({
          ...data,
          subjects: [...data.subjects].sort((a, b) => a.order - b.order),
        })
      } catch {
        setError('Не вдалося завантажити деталі програми')
        setDetails(null)
      } finally {
        setLoading(false)
      }
    }

    void loadDetails()
  }, [open, programId])

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      panelClassName="max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <div className="flex flex-col gap-6">
        <header className="sticky top-0 bg-bg-surface">
          <h2 className="text-2xl font-bold text-text">Деталі навчальної програми</h2>
          {details && <p className="mt-1 text-text-secondary">{details.name}</p>}
        </header>

        {loading && (
          <p className="py-8 text-center text-text-secondary">Завантаження деталей програми...</p>
        )}

        {!loading && error && <FormErrorMessage message={error} />}

        {!loading && !error && details && <StudyProgramSubjectsTable subjects={details.subjects} />}

        <footer className="flex justify-end sticky bottom-0 bg-bg-surface">
          <Button type="button" onClick={onClose} variant="primary" className="px-8">
            Закрити
          </Button>
        </footer>
      </div>
    </ModalLayout>
  )
}
