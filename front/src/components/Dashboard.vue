<template>
  <div class="p-6 bg-white shadow-md rounded-md max-w-4xl mx-auto">
    <h1>Hello {{ user.name }}</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ExpenseSummary :expenses="expenseStore.expenses" />

      <div class="col-span-2">
        <ExpenseList :expenses="expenseStore.expenses" />
      </div>
    </div>

    <div class="mt-8">
      <ExpenseChart :expenses="expenseStore.expenses" />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { useExpenseStore } from "@/stores/expense";
import ExpenseSummary from "@/components/Expense/ExpenseSummary.vue";
import ExpenseList from "@/components/Expense/ExpenseList.vue";
import ExpenseChart from "@/components/Expense/ExpenseChart.vue";
import { onMounted } from "vue";

export default {
  components: {
    ExpenseSummary,
    ExpenseList,
    ExpenseChart,
  },
  setup() {
    const userStore = useUserStore();
    const expenseStore = useExpenseStore();
    const user = userStore.user;

    onMounted(() => {
      expenseStore.getExpenses();
    });

    return {
      user, expenseStore
    };
  }
};
</script>
