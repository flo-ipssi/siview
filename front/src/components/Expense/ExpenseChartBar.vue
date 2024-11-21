<template>
    <div>
        <Bar :data="chartData" :options="{ maintainAspectRatio: false }" />
    </div>
</template>

<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import { computed } from "vue";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps({
    expenses: {
        type: Array,
        required: true,
    },
});

const expensesByMonth = computed(() => {
    const monthlyTotals = Array(12).fill(0);
    props.expenses.forEach((expense:any) => {
        const monthIndex = new Date(expense.date).getMonth();
        monthlyTotals[monthIndex] += parseFloat(expense.amount);
    });
    return monthlyTotals;
});

const chartData = computed(() => ({
    labels: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ],
    datasets: [
        {
            label: "Dépenses par mois (€)",
            data: expensesByMonth.value,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        },
    ],
}));
</script>