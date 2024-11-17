<script setup lang="ts"></script>

<template>
  <header class="bg-dark">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
  </header>

  <RouterView />
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  async mounted() {
    const userStore = useUserStore()
    if (userStore.token) {
      try {
        await userStore.me()
      } catch (error) {
        console.error('Failed to fetch user on load:', error)
        userStore.logout()
      }
    }
  },
}
</script>