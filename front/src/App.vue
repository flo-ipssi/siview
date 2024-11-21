<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';

const userStore = useUserStore();

onMounted(async () => {
  if (userStore.token) {
    try {
      await userStore.me();
    } catch (error) {
      console.error('Failed to fetch user on load:', error);
      userStore.logout();
    }
  }
});
</script>

<template>
  <header class="bg-dark">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <nav v-if="userStore.user">
      <RouterLink to="/expense">Ajouter une depense</RouterLink>
      <RouterLink to="/dashboard">Tableau de bord</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
