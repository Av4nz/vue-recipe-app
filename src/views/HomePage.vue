<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import RecipeCard from '@/components/RecipeCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import RecipeModal from '@/components/RecipeModal.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const display = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')
const filterType = ref('name')

const recipesStore = useRecipesStore()

const filteredRecipes = computed(() => {
  if (!searchQuery.value) return recipesStore.recipes

  const query = searchQuery.value.toLowerCase()

  return recipesStore.recipes.filter((recipe) => {
    if (filterType.value === 'name') {
      return recipe.title.toLowerCase().includes(query)
    }
    if (filterType.value === 'ingredients') {
      return recipe.ingredients.some((ing) => ing.toLowerCase().includes(query))
    }
    if (filterType.value === 'category') {
      return recipe.category.toLowerCase().includes(query)
    }
    return true
  })
})

const handleSearch = (data: { query: string; filterType: string }) => {
  searchQuery.value = data.query
  filterType.value = data.filterType
}

const showModal = ref(false)
const selectedRecipe = ref(null as null | Record<string, any>)

const openModal = (recipe: Record<string, any>) => {
  selectedRecipe.value = recipe
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedRecipe.value = null
}
</script>
<template>
  <section class="flex flex-col justify-center items-center container p-4 my-8 bg-slate-50 dark:bg-gray-900 dark:text-gray-100">
    <h1 class="text-4xl font-bold mb-4 text-center">Recipe Collection App</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300">Discover and save your favorite recipes!</p>
    <ThemeToggle class="mt-2" />

    <div class="my-12 w-full max-w-[750px]">
      <SearchBar @search="handleSearch" />
    </div>
    <div class="mb-4 items-center justify-between flex gap-2 w-full max-w-[1240px]">
      <div class="flex items-center gap-2">
        <label for="display" class="font-medium">Display</label>
        <select
          v-model="display"
          name="display"
          id="display"
          class="bg-white px-4 py-2 shadow rounded-lg text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        >
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>

      <div class="">
        <router-link
          to="/add"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
          >Add Recipe</router-link
        >
      </div>
    </div>
    <div
      class="w-full max-w-[1240px] gap-4"
      :class="
        display === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
      "
    >
      <RecipeCard v-for="r in filteredRecipes" :key="r.id" :recipe="r" :variant="display" @open="openModal"/>
    </div>
    <div v-if="filteredRecipes.length === 0" class="text-center mt-8 text-gray-500">
      <p>No recipes found.</p>
    </div>

    <RecipeModal v-if="showModal" :recipe="selectedRecipe" @close="closeModal" />
  </section>
</template>
