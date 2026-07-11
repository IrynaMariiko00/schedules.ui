import { Button } from '~/ui/Button'
import { ModalFooter } from '~/ui/modal/ModalFooter'

type ModalFormFooterProps = {
  onCancel: () => void
  cancelLabel?: string
  submitLabel: string
  loadingLabel?: string
  isLoading?: boolean
  disabled?: boolean
  submitType?: 'submit' | 'button'
  onSubmit?: () => void
}

export const ModalFormFooter = ({
  onCancel,
  cancelLabel = 'Скасувати',
  submitLabel,
  loadingLabel,
  isLoading = false,
  disabled = false,
  submitType = 'submit',
  onSubmit,
}: ModalFormFooterProps) => {
  const isBusy = isLoading || disabled

  return (
    <ModalFooter>
      <Button type="button" onClick={onCancel} variant="ghost" disabled={isBusy}>
        {cancelLabel}
      </Button>
      <Button
        type={submitType}
        variant="primary"
        className="px-8"
        disabled={isBusy}
        onClick={submitType === 'button' ? onSubmit : undefined}
      >
        {isLoading && loadingLabel ? loadingLabel : submitLabel}
      </Button>
    </ModalFooter>
  )
}
