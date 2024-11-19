import { defineStore } from 'pinia'
import { useUserStore } from './user'

interface Expense {
    id: number
    amount: number
    category: string
    date: string
    description: string
}

export const useExpenseStore = defineStore('expense', {
    state: () => ({
        expenses: [] as Expense[],
    }),
    getters: {
        handleExpenses: (state) => state.expenses,
    },
    actions: {
        async getExpenses() {
            try {
                const userStore = useUserStore();

                if (!userStore.token) {
                    throw new Error('User is not authenticated');
                }

                const res = await fetch('http://localhost:8000/api/expense/list', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + userStore.handleToken,
                    },
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch expenses')
                }
                const data = await res.json()
                this.expenses = data.expenses
            } catch (error) {
                console.error('Fetch expenses error:', error)
                throw error
            }
        },
        async addExpense(expense: any) {
            try {
                const res = await fetch("http://localhost:8000/api/expense/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(expense),
                });

                if (!res.ok) {
                    throw new Error("Erreur lors de l'ajout de la dépense.");
                }

                const newExpense = await res.json();

                this.expenses.push(newExpense);
            } catch (error) {
                console.error("Erreur lors de l'ajout :", error);
                throw error;
            }
        },
    },
})