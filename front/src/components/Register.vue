<template>
    <div class="bg-sky-100 flex justify-center items-center h-screen">
        <!-- Left: Image -->
        <div class="w-1/2 h-screen hidden lg:block">
            <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image"
                class="object-cover w-full h-full" />
        </div>
        <!-- Right: Login Form -->
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 class="text-2xl font-semibold mb-4">Inscription</h1>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="username" class="block text-gray-600">Pseudo</label>
                    <input type="text" id="username" v-model="username"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input type="text" id="email" v-model="email"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-800">Mot de passe</label>
                    <input type="password" id="password" v-model="password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" />
                </div>
                <div class="mb-4">
                    <label for="conf_password" class="block text-gray-800">Confirmation du mot de passe</label>
                    <input type="password" id="conf_password" v-model="conf_password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" />
                </div>
                <button v-if="isLoading" disabled class="bg-gray-300 text-gray-800 font-semibold rounded-md py-2 px-4 w-full">
                    Enregistrement en cours...
                </button>
                <button v-else @click="handleRegister"
                    class="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
                    S'inscrire
                </button>
            </form>

            <div class="mt-6 text-green-500 text-center">
                <RouterLink to="/" class="hover:underline">Se connecter</RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            conf_password: '',
            isLoading: false,
        }
    },
    methods: {
        async handleRegister() {
            this.isLoading = true
            this.errorMessage = ''

            if (!this.username) {
                alert('Veuillez entrer un pseudo')
                return
            }

            if (!this.email) {
                alert('Veuillez entrer une adresse email')
                return
            }
            if (this.password !== this.conf_password) {
                alert('Les mots de passe ne correspondent pas')
                return
            }

            try {
                const userStore = useUserStore();

                await userStore.register({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.conf_password,
                });
                this.$router.push('/dashboard');
            } catch (error) {
                console.error('Erreur lors de l\'inscription', error)
            }
            this.isLoading = false
        }
    }
}

</script>