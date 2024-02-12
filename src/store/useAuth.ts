import { defineStore } from 'pinia'
import type { User } from '@types/User.ts'

export const useAuth = defineStore('auth', {
  state: () => ({
    auth: false,
    user: {} as User
  }),
  actions: {
    // change the state au auth
    updateAuth() {
      this.auth = !this.auth
    },
    setUser(payload: User) {
      this.user = payload

      this.updateAuth()
    }
  },
})