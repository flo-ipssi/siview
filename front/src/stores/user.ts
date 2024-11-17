import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        email: '',
        password: '',
        token: '',
        user: null,
        isLoggedIn: false,
    }),
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        email: (state) => state.email,
        password: (state) => state.password,
        token: (state) => state.token,
    },
    actions: {
        async login(email: string, password: string) {
            const res = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            const data = await res.json()
            this.token = data.token
            this.user = data.user
            this.isLoggedIn = true
        },
        async register(email: string, password: string) {
            const res = await fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            const data = await res.json()
            this.token = data.token
            this.user = data.user
            this.isLoggedIn = true
        },
        logout() {
            this.isLoggedIn = false
        },
    },
})