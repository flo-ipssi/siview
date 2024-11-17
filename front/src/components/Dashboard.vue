<template>
    <div class="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
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
  export default {
    data() {
      return {
        expense: {
          amount: '',
          category: '',
          date: '',
          description: '',
        },
      };
    },
    methods: {
      addExpense() {
        console.log("Dépense ajoutée :", this.expense);
        alert("Dépense ajoutée avec succès !");
        this.expense = { amount: '', category: '', date: '', description: '' };
      },
    },
  };
  </script>
  