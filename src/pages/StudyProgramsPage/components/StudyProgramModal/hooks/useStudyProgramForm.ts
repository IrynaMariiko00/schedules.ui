import { useEffect, useState } from 'react'
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'
import type { DragEndEvent } from '@dnd-kit/core'
import { studyProgramsService } from '~/services/studyProgramsService'
import type { SubjectField } from '../components/SortableSubjectRow'

type StudyProgramFormMode = 'create' | 'edit'

type UseStudyProgramFormOptions = {
  open: boolean
  mode: StudyProgramFormMode
  programId?: number
  onSuccess: () => void
  onClose: () => void
}

const createEmptySubject = (): SubjectField => ({
  id: crypto.randomUUID(),
  name: '',
  hours: 0,
})

export const useStudyProgramForm = ({
  open,
  mode,
  programId,
  onSuccess,
  onClose,
}: UseStudyProgramFormOptions) => {
  const [programName, setProgramName] = useState('')
  const [subjects, setSubjects] = useState<SubjectField[]>([createEmptySubject()])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const isFormValid =
    programName.trim() !== '' &&
    subjects.every((subject) => subject.name.trim() !== '' && subject.hours > 0)

  useEffect(() => {
    if (!open) return

    if (mode === 'create') {
      setProgramName('')
      setSubjects([createEmptySubject()])
      setError(null)
      return
    }

    if (!programId) return

    const loadProgram = async () => {
      setIsLoadingDetails(true)
      setError(null)

      try {
        const data = await studyProgramsService.getById(programId)

        setProgramName(data.name)
        setSubjects(
          [...data.subjects]
            .sort((a, b) => a.order - b.order)
            .map((subject) => ({
              id: crypto.randomUUID(),
              subjectId: subject.id,
              name: subject.name,
              hours: subject.hours,
            })),
        )
      } catch {
        setError('Не вдалося завантажити дані програми')
      } finally {
        setIsLoadingDetails(false)
      }
    }

    void loadProgram()
  }, [open, mode, programId])

  const addSubject = () => {
    setSubjects((prev) => [...prev, createEmptySubject()])
  }

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects((prev) => prev.filter((subject) => subject.id !== id))
    }
  }

  const updateSubject = (id: string, field: keyof SubjectField, value: string | number) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id
          ? { ...subject, [field]: field === 'hours' ? Number(value) : value }
          : subject,
      ),
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSubjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const submit = async () => {
    if (!isFormValid) return

    setIsLoading(true)
    setError(null)

    const orderedSubjects = subjects.map((subject, index) => ({
      name: subject.name.trim(),
      hours: subject.hours,
      order: index + 1,
    }))

    const totalHours = orderedSubjects.reduce((sum, subject) => sum + subject.hours, 0)

    try {
      if (mode === 'create') {
        await studyProgramsService.create({
          name: programName.trim(),
          subjects: orderedSubjects,
        })
      } else if (programId) {
        await studyProgramsService.update(programId, {
          id: programId,
          name: programName.trim(),
          hours: totalHours,
          subjects: subjects.map((subject, index) => ({
            id: subject.subjectId ?? 0,
            name: subject.name.trim(),
            hours: subject.hours,
            order: index + 1,
            studyProgramId: programId,
          })),
        })
      }

      onSuccess()
      onClose()
    } catch {
      setError(mode === 'create' ? 'Не вдалося створити програму.' : 'Не вдалося оновити програму.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    state: {
      programName,
      subjects,
      isLoading,
      isLoadingDetails,
      error,
      isFormValid,
      sensors,
      mode,
    },
    actions: { setProgramName, addSubject, removeSubject, updateSubject, handleDragEnd, submit },
  }
}
