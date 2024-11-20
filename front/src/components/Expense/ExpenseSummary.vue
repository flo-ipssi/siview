<template>
    <div class="p-4 bg-white shadow-md rounded-md">
        <h2 class="text-xl font-semibold mb-2">Résumé des Dépenses</h2>
        <p class="text-lg">Total des dépenses : {{ total }} €</p>
        <p class="text-sm text-gray-500">Dépenses ce mois-ci : {{ monthlyTotal }} €</p>
        <p class="text-sm text-gray-500">Dépenses du jour : {{ dailyTotal }} €</p>
    </div>
</template>

<script>
import { computed } from "vue";

export default {
    props: {
        expenses: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const expenseStore = props.expenses;

        const total = computed(() => {
            if (!expenseStore?.length) return 0;
            return expenseStore.reduce((sum, expense) => sum + parseFloat(expense.amount), 0); 
        });

        const monthlyTotal = computed(() => {
            if (!expenseStore?.length) return 0;

            const currentMonth = new Date().getMonth();
            return expenseStore
                .filter(expense => new Date(expense.date).getMonth() === currentMonth)
                .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        });

        const dailyTotal = computed(() => {
            if (!expenseStore?.length) return 0;

            const currentDay = new Date().getDate();
            return expenseStore
                .filter(expense => new Date(expense.date).getDate() === currentDay)
                .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        });

        return { total, monthlyTotal, dailyTotal };
    },
};
</script>