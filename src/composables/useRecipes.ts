import { ref, watch } from 'vue';

export interface Recipe {
  id: number;
  title: string;
  desc: string;
  image?: string;
  ingredients: string[];
  category: string;
}

const STORAGE_KEY = 'recipes';

export const useRecipes = () => {
  const recipes = ref<Recipe[]>([]);

  const loadRecipes = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      recipes.value = JSON.parse(stored);
    } else {
      recipes.value = [
        { id: 1, title: 'Spaghetti Bolognese', desc: 'Rich meat sauce', image: '', ingredients: ['spaghetti', 'beef', 'tomato'], category: 'Italian' },
        { id: 2, title: 'Chicken Curry', desc: 'Spicy and creamy', image: '', ingredients: ['chicken', 'curry powder', 'coconut milk'], category: 'Indian' },
        { id: 3, title: 'Veggie Bowl', desc: 'Healthy veggies', image: '', ingredients: ['broccoli', 'carrots', 'quinoa'], category: 'Vegan' },
      ];
      saveRecipes();
    }
  };

  const saveRecipes = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes.value));
  };

  const addRecipe = (recipe: Recipe) => {
    recipes.value.push(recipe);
    saveRecipes();
  };

  const deleteRecipe = (id: number) => {
    recipes.value = recipes.value.filter((r) => r.id !== id);
    saveRecipes();
  };

  const updateRecipe = (id: number, updated: Partial<Recipe>) => {
    const index = recipes.value.findIndex((r) => r.id === id);
    if (index !== -1) {
      recipes.value[index] = { ...recipes.value[index], ...updated } as Recipe;
      saveRecipes();
    }
  };

  watch(() => recipes.value, saveRecipes, { deep: true });

  return { recipes, loadRecipes, addRecipe, deleteRecipe, updateRecipe };
};
