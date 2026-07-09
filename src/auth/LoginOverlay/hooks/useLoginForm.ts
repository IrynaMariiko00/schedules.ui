import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '~/contexts/AuthContext'
import { getLoginErrorMessage } from '~/lib/formatApiError'
import { dispatchAuthLogin } from '~/lib/authEvents'
import { authService } from '~/services/authService'
import { useToast } from '~/ui/toast/useToast'

type UseLoginFormOptions = {
  open: boolean
}

export const useLoginForm = ({ open }: UseLoginFormOptions) => {
  const { closeLoginModal } = useAuth()
  const toast = useToast()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  useEffect(() => {
    if (!open) return

    setUsername('')
    setPassword('')
    setError(null)
    setIsPasswordVisible(false)
  }, [open])

  const handleUsernameChange = (value: string) => {
    setUsername(value)
    if (error) setError(null)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (error) setError(null)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await authService.login({ username, password })
      closeLoginModal()
      dispatchAuthLogin()
      toast.success('Успішний вхід')
    } catch (err) {
      setError(getLoginErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    state: {
      username,
      password,
      error,
      isLoading,
      isPasswordVisible,
    },
    actions: {
      setUsername: handleUsernameChange,
      setPassword: handlePasswordChange,
      togglePasswordVisibility: () => setIsPasswordVisible((prev) => !prev),
      submit,
    },
  }
}
