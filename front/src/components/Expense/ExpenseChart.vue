<template>
    <div class="p-4 bg-white shadow-md rounded-md">
        <h2 class="text-xl font-semibold mb-4">Graphiques des dépenses</h2>
        <canvas id="expenseChart"></canvas>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useExpenseStore } from "@/stores/expense";
import Chart from "chart.js/auto";

export default {
    setup() {
        const expenseStore = useExpenseStore();

        onMounted(() => {
            const categories = Array.from(
                new Set(expenseStore.expenses.map(expense => expense.category))
            );

            const categoryTotals = categories.map(category => {
                return expenseStore.expenses
                    .filter(expense => expense.category === category)
                    .reduce((sum, expense) => sum + expense.amount, 0);
            });

            const ctx = document.getElementById("expenseChart").getContext("2d");
            new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: categories,
                    datasets: [
                        {
                            label: "Dépenses par Catégorie",
                            data: categoryTotals,
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                        },
                    ],
                },
            });
        });
    },
};
</script>