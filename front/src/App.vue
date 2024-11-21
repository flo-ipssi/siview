<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push('/');
};

</script>

<template>
  <header v-if="userStore.user"
    class="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02 w-full text-center">
    <nav class="nav font-semibold text-lg  w-full">
      <ul class="flex items-center">
        <li
          class="p-4 border-b-2 border-gray-500 border-opacity-0 hover:border-opacity-100 hover:text-gray-500 duration-200 cursor-pointer">
          <RouterLink to="/dashboard">Tableau de bord</RouterLink>
        </li>
        <li
          class="p-4 border-b-2 border-gray-500 border-opacity-0 hover:border-opacity-100 hover:text-gray-500 duration-200 cursor-pointer">
          <RouterLink to="/expense">Ajouter une depense</RouterLink>
        </li>
        <li>
          <button @click="handleLogout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <div v-if="userStore.isLoading" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div class="loader"></div>
    <p class="text-white text-2xl font-bold block ml-2">
      <span class="text-gray-200">Chargement...</span>
    </p>
  </div>

  <RouterView />
</template>

<style>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>