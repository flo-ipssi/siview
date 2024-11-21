<template>
    <div class="p-4 bg-white shadow-md rounded-md">
        <h2 class="text-xl font-semibold mb-4">Liste des Dépenses</h2>

        <!-- Filtres -->
        <div class="flex gap-4 mb-4">
            <input type="date" v-model="filters.date" class="border rounded-md px-3 py-2"
                placeholder="Filtrer par date" />
            <select v-model="filters.category" class="border rounded-md px-3 py-2">
                <option value="">Toutes les catégories</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Transport">Transport</option>
                <option value="Loisirs">Loisirs</option>
                <option value="Autres">Autres</option>
            </select>
        </div>

        <!-- Liste -->
        <ul class="space-y-3">
            <li v-for="expense in filteredExpenses" :key="expense.id"
                class="p-3 bg-gray-100 rounded-md flex justify-between">
                <span>{{ expense.description }}</span>
                <span>{{ expense.amount }} €</span>
                <span class="text-sm text-gray-500">{{ expense.date }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useExpenseStore } from '../../stores/expense'

export default {
    props: {
        expenses: {
            type: Array,
            required: true,
        },
    },
    setup() {
        const expenseStore = useExpenseStore()
        const filters = reactive({
            date: '',
            category: '',
        })

        const filteredExpenses = computed(() =>
            expenseStore.expenses.filter((expense) => {
                return (
                    (!filters.date || expense.date.startsWith(filters.date)) &&
                    (!filters.category || expense.category === filters.category)
                );
            })
        );

        return {
            filters,
            filteredExpenses,
        }
    },
}
</script>
