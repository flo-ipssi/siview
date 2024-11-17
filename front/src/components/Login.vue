<template>
    <div class="bg-sky-100 flex justify-center items-center h-screen">
        <!-- Left: Image -->
        <div class="w-1/2 h-screen hidden lg:block">
            <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image"
                class="object-cover w-full h-full" />
        </div>
        <!-- Right: Login Form -->
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 class="text-2xl font-semibold mb-4">Login</h1>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input type="text" id="email" v-model="email"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-800">Password</label>
                    <input type="password" id="password" v-model="password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" />
                </div>
                <button 
                    @click="login"
                    class="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
                    Login
                </button>
            </form>

            <div class="mt-6 text-green-500 text-center">
                <RouterLink to="/register" class="hover:underline">S'inscrire ici</RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
export default {
    setup() {
        const userStore = useUserStore();
        return { useUserStore }
    },
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        async login() {
            await this.useUserStore.login(this.email, this.password)
            this.$router.push('/')
        },
    }
        
}

</script>