import React, { createContext, useCallback, useContext, useRef, useState } from 'react'

type ModalGuardContextType = {
  isModalOpen: boolean
  registerModalOpen: () => () => void
}

const ModalGuardContext = createContext<ModalGuardContextType | undefined>(undefined)

export const ModalGuardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const openCountRef = useRef(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const registerModalOpen = useCallback(() => {
    openCountRef.current += 1
    setIsModalOpen(true)

    return () => {
      openCountRef.current = Math.max(0, openCountRef.current - 1)
      setIsModalOpen(openCountRef.current > 0)
    }
  }, [])

  return (
    <ModalGuardContext.Provider value={{ isModalOpen, registerModalOpen }}>
      {children}
    </ModalGuardContext.Provider>
  )
}

export const useModalGuard = () => {
  const context = useContext(ModalGuardContext)
  if (!context) {
    throw new Error('useModalGuard must be used within a ModalGuardProvider')
  }
  return context
}

export const useRegisterModalOpen = (open: boolean) => {
  const { registerModalOpen } = useModalGuard()

  React.useEffect(() => {
    if (!open) return
    return registerModalOpen()
  }, [open, registerModalOpen])
}
