import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const STORAGE_KEY = 'favorites';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<number[]>([]);

  const loadFavorites = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        favorites.value = JSON.parse(stored) as number[];
      } catch {
        favorites.value = [];
      }
    }
  };

  loadFavorites();

  watch(
    favorites,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
  );

  const addFavorite = (id: number) => {
    if (!favorites.value.includes(id)) {
      favorites.value.push(id);
    }
  };

  const removeFavorite = (id: number) => {
    favorites.value = favorites.value.filter((fav) => fav !== id);
  };

  const isFavorite = (id: number) => favorites.value.includes(id);

  const toggleFavorite = (id: number) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
})
