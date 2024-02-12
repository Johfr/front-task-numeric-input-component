import { computed } from 'vue'
import { useAuth } from "@store/useAuth"

// this function is useful for retrieving the user data from the store
export function useUser () {
  const userStore = useAuth()
  const isAuth = computed(() => userStore.auth)
  const userData = computed(() => userStore.user)

  return {
    isAuth,
    userData
  }
}