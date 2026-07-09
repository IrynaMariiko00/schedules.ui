import { useEffect, useRef } from 'react'
import { AUTH_LOGIN_EVENT } from '~/lib/authEvents'

type UseAutoListFetchOptions = {
  pause?: boolean
}

export function useAutoListFetch(
  refetch: () => Promise<void>,
  deps: unknown[],
  options?: UseAutoListFetchOptions,
) {
  const pause = options?.pause ?? false
  const pauseRef = useRef(pause)
  const pendingRefetchRef = useRef(false)
  const prevPauseRef = useRef(pause)

  pauseRef.current = pause

  useEffect(() => {
    if (pause) {
      pendingRefetchRef.current = true
      return
    }

    pendingRefetchRef.current = false
    void refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps are passed explicitly by caller
  }, [...deps, pause, refetch])

  useEffect(() => {
    const wasPaused = prevPauseRef.current
    prevPauseRef.current = pause

    if (wasPaused && !pause && pendingRefetchRef.current) {
      pendingRefetchRef.current = false
      void refetch()
    }
  }, [pause, refetch])

  useEffect(() => {
    const handleLogin = () => {
      if (pauseRef.current) {
        pendingRefetchRef.current = true
        return
      }

      void refetch()
    }

    window.addEventListener(AUTH_LOGIN_EVENT, handleLogin)

    return () => {
      window.removeEventListener(AUTH_LOGIN_EVENT, handleLogin)
    }
  }, [refetch])
}
