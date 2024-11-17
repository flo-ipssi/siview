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
                    <label for="username" class="block text-gray-600">Username</label>
                    <input type="text" id="username" v-model="username"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input type="text" id="email" v-model="username"
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
                    @click="register"
                    class="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
                    Inscription
                </button>
            </form>
            
            <div class="mt-6 text-green-500 text-center">
                <RouterLink to="/" class="hover:underline">Se connecter</RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        register() {
            this.$store.dispatch('register', this.username)
        }
    }
}
</script>