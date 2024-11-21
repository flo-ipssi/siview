<template>
    <div class="p-4 bg-white shadow-md rounded-md">
        <h2 class="text-xl font-semibold mb-2">Résumé des Dépenses</h2>
        <p class="text-lg">Total des dépenses : {{ total }} €</p>
        <p class="text-sm text-gray-500">Dépenses ce mois-ci : {{ monthlyTotal }} €</p>
    </div>
</template>

<script>
import { computed } from "vue";
import { useExpenseStore } from "@/stores/expense";

export default {
    setup() {
        const expenseStore = useExpenseStore();

        const total = computed(() =>
            expenseStore.expenses.reduce((sum, expense) => sum + expense.amount, 0)
        );

        const monthlyTotal = computed(() => {
            const currentMonth = new Date().getMonth();
            return expenseStore.expenses
                .filter(expense => new Date(expense.date).getMonth() === currentMonth)
                .reduce((sum, expense) => sum + expense.amount, 0);
        });

        return { total, monthlyTotal };
    },
};
</script>