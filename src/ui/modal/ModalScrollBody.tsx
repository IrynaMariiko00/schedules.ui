import { type ReactNode } from 'react'
import { cn } from '~/lib/cn'

type ModalScrollBodyProps = {
  children: ReactNode
  className?: string
}

export const ModalScrollBody = ({ children, className }: ModalScrollBodyProps) => {
  return (
    <div
      className={cn(
        'min-h-0 flex-1 overflow-y-auto py-6 scrollbar-hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}
