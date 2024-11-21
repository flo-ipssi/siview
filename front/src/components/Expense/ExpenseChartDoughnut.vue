<template>
    <div>
        <Doughnut :data="chartData" :options="{ maintainAspectRatio: false }" />
    </div>
</template>

<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Doughnut } from "vue-chartjs";
import { computed } from "vue";
import { EXPENSE_CATEGORIES } from "@/constants/categories";

interface Expense {
    category: string;
    amount: string;
    date: string;
    description?: string;
}

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const props = defineProps({
    expenses: {
        type: Array as () => Expense[],
        required: true,
    },
});

const expensesByCategory = computed(() => {
    const categories = EXPENSE_CATEGORIES.map(category => category.key);
    categories.sort();
    const categoryTotals = categories.map(category => {
        return props.expenses
            .filter((expense: Expense) => expense.category === category) 
            .reduce((sum, expense: Expense) => sum + parseFloat(expense.amount), 0); 
    });
    return { categories, categoryTotals };
});

const chartData = computed(() => ({
    labels: expensesByCategory.value.categories,
    datasets: [
        {
            label: "Dépenses par catégorie (€)",
            data: expensesByCategory.value.categoryTotals,
            backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
                "#FF9F40", "#FFCD56", "#36A2EB", "#4B8B3B", "#D50000", // Ajout de couleurs
            ],
            borderColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
                "#FF9F40", "#FFCD56", "#36A2EB", "#4B8B3B", "#D50000",
            ],
            borderWidth: 1,
        },
    ],
}));
</script>
