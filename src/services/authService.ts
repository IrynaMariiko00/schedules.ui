import { apiClient } from '~/lib/apiClient'
import type { LoginDto, AuthResponseDto } from '~/types/api/auth'

export const authService = {
  login(payload: LoginDto) {
    return apiClient<AuthResponseDto>('/auth/login', {
      method: 'POST',
      body: payload,
    })
  },
}
