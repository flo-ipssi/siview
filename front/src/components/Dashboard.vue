<template>
  <div class="p-6 bg-white shadow-md rounded-md max-w-full mx-auto">
    <h1 class="text-3xl font-bold mb-4">Hello {{ user.name }}</h1>
    <h2 class="text-2xl font-bold mb-4 text-gray-700">Tableau de Bord</h2>

    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <p class="text-gray-500 mt-4">Chargement des dépenses...</p>
    </div>

    <div v-else class="grid grid-cols-3 gap-6">
      <ExpenseSummary :expenses="expenseStore.expenses" />
      <div class="col-span-2">
        <ExpenseList :expenses="expenseStore.expenses" />
      </div>

        <ExpenseChartDoughnut :expenses="expenseStore.expenses" />
      <div class="col-span-2">
      <ExpenseChartBar :expenses="expenseStore.expenses" />
      </div>
    </div>

  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { useExpenseStore } from "@/stores/expense";
import ExpenseSummary from "@/components/Expense/ExpenseSummary.vue";
import ExpenseList from "@/components/Expense/ExpenseList.vue";
import ExpenseChartDoughnut from "@/components/Expense/ExpenseChartDoughnut.vue";
import ExpenseChartBar from "@/components/Expense/ExpenseChartBar.vue";
import { onMounted, ref, } from "vue";

export default {
  components: {
    ExpenseSummary,
    ExpenseList,
    ExpenseChartDoughnut,
    ExpenseChartBar
  },
  setup() {
    const expenseStore = useExpenseStore();
    const userStore = useUserStore();
    const user = userStore.user;
    const isLoading = ref(true);

    onMounted(async () => {
      try {
        await expenseStore.getExpenses();
      } catch (error) {
        console.error("Erreur lors du chargement des dépenses :", error);
      } finally {
        isLoading.value = false;
      }
    });

    return {
      user, expenseStore, isLoading
    };
  }
};
</script>
