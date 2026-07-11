import { cn } from '~/lib/cn'

type ModalHeaderProps = {
  title: string
  description?: string
  className?: string
}

export const ModalHeader = ({ title, description, className }: ModalHeaderProps) => {
  return (
    <header className={cn('shrink-0 border-b border-border bg-bg-surface pb-4', className)}>
      <h2 className="text-2xl font-bold text-text">{title}</h2>
      {description && <p className="mt-1 text-text-secondary">{description}</p>}
    </header>
  )
}
