import { defineStore } from 'pinia'

interface User {
    id: number;
    email: string;
    name: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        email: '',
        password: '',
        user: null as User | null,
        token: localStorage.getItem('token') || '',
        isLoggedIn: !!localStorage.getItem('token'),
    }),
    getters: {
        handleIsLoggedIn: (state) => state.isLoggedIn,
        handleEmail: (state) => state.email,
        handlePassword: (state) => state.password,
        handleToken: (state) => state.token,
        handleUserName: (state) => state.user || null,
    },
    actions: {
        async login(email: string, password: string) {
            try {
                const res = await fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                })

                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message || 'Login failed')
                }

                const data = await res.json()

                if (!data.token || !data.user) {
                    throw new Error('Invalid response from server')
                }
                
                this.token = data.token;
                this.user = data.user
                this.isLoggedIn = true
                localStorage.setItem('token', this.token)

            } catch (error) {
                console.error('Login error:', error)
                throw error
            }
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
        async me() {
            try {
                const res = await fetch('http://localhost:8000/api/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                    },
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch user')
                }
                const data = await res.json()
                this.user = data.user
                this.isLoggedIn = true
            } catch (error) {
                console.error('Fetch user error:', error)
                throw error
            }
        },
        logout() {
            this.isLoggedIn = false
            this.token = ''
            this.user = null
        },
    },
})