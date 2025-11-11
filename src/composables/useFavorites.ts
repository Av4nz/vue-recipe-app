import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';

export const useFavorites = () => {
  const store = useFavoritesStore();

  const favorites = computed(() => store.favorites);
  const isFavorite = (id: number) => store.isFavorite(id);
  const toggleFavorite = (id: number) => store.toggleFavorite(id);
  const addFavorite = (id: number) => store.addFavorite(id);
  const removeFavorite = (id: number) => store.removeFavorite(id);

  return { favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite };
};
