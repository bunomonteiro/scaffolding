import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const JWT_KEY = `${import.meta.env.VITE_APP_ALIAS}|JWT`
  const USER_KEY = `${import.meta.env.VITE_APP_ALIAS}|USER`
  // private
  const _jwt = ref(null)
  const _user = ref(null)

  _jwt.value = localStorage.getItem(JWT_KEY)
  _user.value = JSON.parse(localStorage.getItem(USER_KEY))

  const user = computed(() => _user.value)
  const jwt = computed(() => _jwt.value)
  const isAuthenticated = computed(() => _jwt.value != null)

  function login(data) {
    _jwt.value = data.jwt
    _user.value = data.user

    localStorage.setItem(JWT_KEY, data.jwt)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
  }

  function logout() {
    _jwt.value = null
    _user.value = null
    localStorage.removeItem(JWT_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { user, jwt, isAuthenticated, login, logout }
})
