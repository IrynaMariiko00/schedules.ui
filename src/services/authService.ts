import { apiClient } from '~/lib/apiClient'
import type { LoginDto, AuthResponseDto, RegisterRequest } from '~/types/api/auth'

import { tokenService } from './tokenService'

export const authService = {
  async login(payload: LoginDto) {
    const response = await apiClient<AuthResponseDto>('/Auth/login', {
      method: 'POST',
      body: payload,
      suppressUnauthorizedEvent: true,
    })
    tokenService.setToken(response.token)
    return response
  },
  async register(payload: RegisterRequest) {
    return apiClient<void>('/Auth/register', {
      method: 'POST',
      body: payload,
    })
  },
  async logout() {
    try {
      await apiClient<void>('/Auth/logout', {
        method: 'POST',
      })
    } finally {
      tokenService.removeToken()
    }
  },
}
