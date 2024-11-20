import { defineStore } from 'pinia'

interface User {
    email: string
    name: string
}

interface CreateUser {
    email: string
    username: string
    password: string
    password_confirmation: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        email: '',
        password: '',
        user: null as User | null,
        token: localStorage.getItem('token') || '',
        isLoading: false,
    }),
    getters: {
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

                this.token = data.token
                this.user = data.user
                localStorage.setItem('token', this.token)
            } catch (error) {
                console.error('Login error:', error)
                throw error
            }
        },
        async register(user: CreateUser) {
            const res = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.username,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation,
                }),
            })

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur lors de l\'inscription');
            }

            const data = await res.json();
            this.token = data.token;
            this.user = data.user;
            localStorage.setItem('token', this.token);
        },
        async me() {
            this.isLoading = true
            if (!this.token) {
                throw new Error('Token is not present');
            }

            try {
                const res = await fetch('http://localhost:8000/api/me', {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch user')
                }
                const data = await res.json()
                this.user = data.user
            } catch (error) {
                console.error('Fetch user error:', error)
                throw error
            } finally{
                this.isLoading = false 
            }
        },
        logout() {
            this.token = ''
            this.user = null
            localStorage.removeItem('token')
        },
    },
})
