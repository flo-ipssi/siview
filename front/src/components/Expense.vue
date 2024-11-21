<template>
  <div class="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
    <h1>Hello {{ user.name }}</h1>
    <h2 class="text-2xl font-bold mb-4 text-gray-700">Ajouter une Dépense</h2>
    <form @submit.prevent="addExpense">
      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="amount">Montant</label>
        <input
          type="number"
          id="amount"
          v-model="expense.amount"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez le montant"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="category">Catégorie</label>
        <select
          id="category"
          v-model="expense.category"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Alimentation">Alimentation</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
          <option value="Autres">Autres</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="date">Date</label>
        <input
          type="date"
          id="date"
          v-model="expense.date"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="description">Description</label>
        <textarea
          id="description"
          v-model="expense.description"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez une description"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Ajouter
      </button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useExpenseStore } from '../stores/expense'
import { ref } from 'vue'

export default {
  setup() {
    const userStore = useUserStore()
    const expenseStore = useExpenseStore()
    const expense = ref({
      amount: '',
      category: '',
      date: '',
      description: '',
    })
    const user = userStore.user

    const addExpense = async () => {
      if (!expense.value.amount || !expense.value.category || !expense.value.date) {
        alert('Tous les champs obligatoires doivent être remplis !')
        return
      }

      expenseStore
        .addExpense(expense.value)
        .then(() => {
          alert('Dépense ajoutée avec succès !')
          expense.value = { amount: '', category: '', date: '', description: '' }
        })
        .catch((err) => {
          alert('Une erreur est survenue : ' + err.message)
        })
    }

    return {
      user,
      expense,
      addExpense,
    }
  },
}
</script>
