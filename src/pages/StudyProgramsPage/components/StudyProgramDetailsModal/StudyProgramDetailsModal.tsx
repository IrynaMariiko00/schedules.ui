import { useEffect, useState } from 'react'
import { ModalLayout } from '~/ui/ModalLayout'
import { useRegisterModalOpen } from '~/contexts/ModalGuardContext'
import { useToast } from '~/ui/toast/useToast'
import { getErrorMessage } from '~/lib/formatApiError'
import { studyProgramsService } from '~/services/studyProgramsService'
import type { StudyProgramDetailsDto } from '~/types/api/studyProgram'
import { StudyProgramSubjectsTable } from './components/StudyProgramSubjectsTable'
import { Button } from '~/ui/Button'
import { ModalFooter } from '~/ui/modal/ModalFooter'
import { ModalHeader } from '~/ui/modal/ModalHeader'
import { ModalScrollBody } from '~/ui/modal/ModalScrollBody'

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
  useRegisterModalOpen(open)
  const toast = useToast()
  const [details, setDetails] = useState<StudyProgramDetailsDto | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !programId) {
      setDetails(null)
      return
    }

    const loadDetails = async () => {
      setLoading(true)

      try {
        const data = await studyProgramsService.getById(programId)

        setDetails({
          ...data,
          subjects: [...data.subjects].sort((a, b) => a.order - b.order),
        })
      } catch (err) {
        toast.error(getErrorMessage(err, 'Не вдалося завантажити деталі програми'))
        setDetails(null)
      } finally {
        setLoading(false)
      }
    }

    void loadDetails()
  }, [open, programId, toast])

  return (
    <ModalLayout open={open} onClose={onClose} panelClassName="max-w-4xl modal-form-panel">
      <div className="flex min-h-0 flex-1 flex-col">
        <ModalHeader
          title="Деталі навчальної програми"
          description={details?.name}
        />

        <ModalScrollBody>
          {loading && (
            <p className="py-8 text-center text-text-secondary">Завантаження деталей програми...</p>
          )}

          {!loading && details && <StudyProgramSubjectsTable subjects={details.subjects} />}
        </ModalScrollBody>

        <ModalFooter>
          <Button type="button" onClick={onClose} variant="primary" className="px-8">
            Закрити
          </Button>
        </ModalFooter>
      </div>
    </ModalLayout>
  )
}
