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
                this.expenses = data
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

                const data = await res.json();

                this.expenses.push(data.expense);
            } catch (error) {
                console.error("Erreur lors de l'ajout :", error);
                throw error;
            }
        },
        async deleteExpense(expenseId: any) {
            try {
                const res = await fetch(`http://localhost:8000/api/expense/delete/${expenseId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Erreur lors de la suppression de la dépense.");
                }

                console.log('Avant :', this.expenses);

                this.expenses = this.expenses.filter((expense) => expense.id !== expenseId);
                console.log(this.expenses.filter((expense) => expense.id !== expenseId));

                console.log('Après :', this.expenses);
            } catch (error) {
                console.error("Erreur suppression:", error);
                throw error;
            }
        },
        async editExpense(updatedExpense: Expense) {
            try {
                const res = await fetch(`http://localhost:8000/api/expense/update/${updatedExpense.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(updatedExpense),
                });

                if (!res.ok) {
                    throw new Error("Erreur lors de la mise à jour de la dépense.");
                }

                const data = await res.json();
                console.log(data);

                const index = this.expenses.findIndex((expense) => expense.id === data.expense.id);
                if (index !== -1) {
                    this.expenses[index] = data.expense;
                }
            } catch (error) {
                console.error("Erreur modification:", error);
                throw error;
            }
        },
    },
})