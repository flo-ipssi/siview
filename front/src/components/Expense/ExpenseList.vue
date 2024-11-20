<template>
    <div class="p-4 bg-white shadow-md rounded-md">
        <h2 class="text-xl font-semibold mb-4">Liste des Dépenses</h2>

        <!-- Filters -->
        <div class="flex gap-4 mb-4">
            <select v-model="filters.category" class="border rounded-md px-3 py-2 mb-6">
                <option value="">Toutes les catégories</option>
                <option v-for="category in categories" :key="category.key" :value="category.key">
                    {{ category.label }}
                </option>
            </select>
            <input type="date" v-model="filters.startDate" class="border rounded-md px-3 h-10"
                placeholder="Début de la période" />
            <input type="date" v-model="filters.endDate" class="border rounded-md px-3 h-10"
                placeholder="Fin de la période" />
        </div>

        <ul class="space-y-3 overflow-y-auto h-60 pr-4">
            <li v-for="expense in filteredExpenses" :key="expense.id"
                class="p-3 bg-gray-100 rounded-md flex justify-between items-center">
                <div class="flex-1">
                    <template v-if="editExpenseId === expense.id">
                        <div class="flex gap-4">
                            <input v-model="editExpenseForm.category" type="text"
                                class="border rounded-md px-2 py-1 w-32" />
                            <input v-model="editExpenseForm.description" type="text"
                                class="border rounded-md px-2 py-1 w-48" />
                            <input v-model="editExpenseForm.amount" type="number"
                                class="border rounded-md px-2 py-1 w-24" />
                            <input v-model="editExpenseForm.date" type="date"
                                class="border rounded-md px-2 py-1 w-32" />
                        </div>
                    </template>
                    <template v-else>
                        <span
                            class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                            {{ expense.category }}
                        </span>
                        <span class="ml-4">{{ expense.description }}</span>
                    </template>
                </div>
                <span class="mr-4">{{ expense.amount }} €</span>
                <span class="text-sm text-gray-500 mr-4">{{ expense.date }}</span>
                <div>
                    <template v-if="editExpenseId === expense.id">
                        <button v-if="filters.isLoading" disabled
                            class="inline-flex mr-2 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Enregistrement en cours...
                        </button>
                        <button v-else @click="saveEdit(expense.id)"
                            class="text-green-500 hover:text-green-700 font-semibold mr-2">
                            Enregistrer
                        </button>
                        <button @click="cancelEdit" class="text-gray-500 hover:text-gray-700 font-semibold">
                            Annuler
                        </button>
                    </template>
                    <template v-else>
                        <button @click="startEdit(expense)"
                            class="text-blue-500 hover:text-blue-700 font-semibold mr-2">
                            Modifier
                        </button>
                        <button @click="deleteExpense(expense.id)"
                            class="text-red-500 hover:text-red-700 font-semibold">
                            Supprimer
                        </button>
                    </template>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { EXPENSE_CATEGORIES } from '@/constants/categories'
import { useExpenseStore } from '@/stores/expense'

export default {
    setup() {
        const expenseStore = useExpenseStore()
        const categories = EXPENSE_CATEGORIES
        const filters = reactive({
            startDate: '',
            endDate: '',
            category: '',
            isLoading: false,
            isLoadingDelete: false,
        })
        
        const filteredExpenses = computed(() =>
            expenseStore.expenses.filter((expense) => {
                const expenseDate = new Date(expense.date)
                const startDate = filters.startDate ? new Date(filters.startDate) : null
                const endDate = filters.endDate ? new Date(filters.endDate) : null

                const isWithinStartDate = !startDate || expenseDate >= startDate
                const isWithinEndDate = !endDate || expenseDate <= endDate
                const isMatchingCategory = !filters.category || expense.category === filters.category

                return isWithinStartDate && isWithinEndDate && isMatchingCategory
            })
        )

        // EDITION
        // Fields for edit
        const editExpenseId = ref(null)
        const editExpenseForm = reactive({
            category: '',
            description: '',
            amount: 0,
            date: '',
        })

        const startEdit = (expense) => {
            editExpenseId.value = expense.id
            editExpenseForm.category = expense.category
            editExpenseForm.description = expense.description
            editExpenseForm.amount = expense.amount
            editExpenseForm.date = expense.date
        }

        const saveEdit = async (id) => {
            filters.isLoading = true
            try {
                await expenseStore.editExpense({
                    id,
                    ...editExpenseForm,
                })
                editExpenseId.value = null
                alert('Dépense modifiée avec succès !')
            } catch (error) {
                console.error('Erreur lors de la mise à jour :', error)
            }
            filters.isLoading = false
        }

        const cancelEdit = () => {
            editExpenseId.value = null
        }

        const deleteExpense = async (id) => {
            filters.isLoadingDelete = true
            try {
                await expenseStore.deleteExpense(id)
                alert('Dépense supprimée !')
            } catch (error) {
                alert('Erreur lors de la suppression.')
            }
            filters.isLoadingDelete = false
        }

        return {
            categories,
            filters,
            filteredExpenses,
            editExpenseId,
            editExpenseForm,
            startEdit,
            saveEdit,
            cancelEdit,
            deleteExpense,
        }
    },
}
</script>
