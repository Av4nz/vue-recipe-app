import { defineStore } from 'pinia';
import { useRecipes } from '@/composables/useRecipes';

export const useRecipesStore = defineStore('recipes', () => {
  const { recipes, loadRecipes, addRecipe, deleteRecipe, updateRecipe } = useRecipes();

  // Load recipes when store initializes
  loadRecipes();

  return { recipes, addRecipe, deleteRecipe, updateRecipe };
});
