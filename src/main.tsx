import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '~/ui/toast/ToastProvider'
import '~/styles/tailwind.css'
import '~/styles/main.scss'
import { App } from '~/App'
import { AuthProvider } from '~/contexts/AuthContext'
import { ModalGuardProvider } from '~/contexts/ModalGuardContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ModalGuardProvider>
        <BrowserRouter>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BrowserRouter>
      </ModalGuardProvider>
    </AuthProvider>
  </StrictMode>,
)
