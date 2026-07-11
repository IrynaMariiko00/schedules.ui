import { type ReactNode } from 'react'
import { cn } from '~/lib/cn'

type ModalFooterProps = {
  children: ReactNode
  className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <footer
      className={cn(
        'flex shrink-0 justify-end gap-3 border-t border-border bg-bg-surface pt-4',
        className,
      )}
    >
      {children}
    </footer>
  )
}
