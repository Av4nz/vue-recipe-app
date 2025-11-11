<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRecipes } from '@/composables/useRecipes';
import ThemeToggle from '@/components/ThemeToggle.vue';

const router = useRouter();

const { loadRecipes, addRecipe } = useRecipes();
loadRecipes();

const form = reactive({
  title: '',
  desc: '',
  image: '',
  ingredients: [''],
  category: '',
});

const handleAddIngredient = () => form.ingredients.push('');
const handleRemoveIngredient = (index: number) => form.ingredients.splice(index, 1);

const handleSubmit = () => {
  if (!form.title.trim() || !form.desc.trim() || !form.category.trim()) {
    alert('Please fill required fields (title, description, category).');
    return;
  }

  addRecipe({
    id: Date.now(),
    title: form.title.trim(),
    desc: form.desc.trim(),
    image: form.image.trim(),
    ingredients: form.ingredients.map(i => i.trim()).filter(i => i),
    category: form.category.trim(),
  });

  // navigate back to home
  router.push('/');
};
</script>

<template>
  <section class="flex flex-col justify-center items-center container p-4 my-8 bg-slate-50 dark:bg-gray-900 dark:text-gray-100">
    <h1 class="text-4xl font-bold mb-4 text-center">Add New Recipe</h1>
    <ThemeToggle class="mb-8"/>

    <form @submit.prevent="handleSubmit" class="w-full max-w-[600px] bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100">
      <div class="mb-6">
        <label class="block font-semibold mb-2">Recipe Title *</label>
        <input v-model="form.title" type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter recipe title" required />
      </div>

      <div class="mb-6">
        <label class="block font-semibold mb-2">Description *</label>
        <textarea v-model="form.desc" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter recipe description" rows="4" required></textarea>
      </div>

      <div class="mb-6">
        <label class="block font-semibold mb-2">Category *</label>
        <select v-model="form.category" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 dark:text-gray-100" required>
          <option value="">Select a category</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Vegan">Vegan</option>
          <option value="Asian">Asian</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="mb-6">
        <label class="block font-semibold mb-2">Image URL</label>
        <input v-model="form.image" type="url" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="https://example.com/image.jpg" />
      </div>

      <div class="mb-6">
        <label class="block font-semibold mb-2">Ingredients</label>
        <div v-for="(ingredient, index) in form.ingredients" :key="index" class="flex gap-2 mb-2">
          <input v-model="form.ingredients[index]" type="text" class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" :placeholder="`Ingredient ${index + 1}`" />
          <button v-if="form.ingredients.length > 1" type="button" @click="handleRemoveIngredient(index)" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Remove
          </button>
        </div>
        <button type="button" @click="handleAddIngredient" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          + Add Ingredient
        </button>
      </div>

      <div class="flex gap-4">
        <button type="submit" class="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">
          Add Recipe
        </button>
        <router-link to="/" class="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 text-center">
          Cancel
        </router-link>
      </div>
    </form>
  </section>
</template>
