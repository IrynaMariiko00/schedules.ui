export const AUTH_LOGIN_EVENT = 'auth:login'

export function dispatchAuthLogin() {
  window.dispatchEvent(new Event(AUTH_LOGIN_EVENT))
}
