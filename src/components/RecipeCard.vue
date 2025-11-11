<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useFavorites } from '@/composables/useFavorites';

interface Recipe {
  id: number;
  title: string;
  desc: string;
  image?: string;
}

const props = defineProps<{
  recipe: Recipe;
  variant?: 'grid' | 'list';
}>();

const emit = defineEmits<{
  (e: 'open', recipe: Recipe): void;
}>();

const { isFavorite, toggleFavorite } = useFavorites();

const isList = computed(() => props.variant === 'list');

const containerClass = computed(() =>
  isList.value
    ? 'flex items-center gap-4 bg-white rounded-lg shadow-md overflow-hidden p-4 bg-white dark:bg-gray-800 dark:text-gray-100'
    : 'bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:text-gray-100'
);

const imgClass = computed(() =>
  isList.value
    ? 'w-28 h-full object-cover flex-shrink-0 rounded-md'
    : 'w-full h-48 object-cover'
);

const contentClass = computed(() => (isList.value ? 'flex-1' : 'p-4'));

const isFav =  computed(() => isFavorite(props.recipe.id));

const openDetail = () => {
  emit('open', props.recipe);
}
</script>

<template>
  <article :class="containerClass">
    <img
      :src="recipe.image || 'https://placehold.co/600x400'"
      :alt="recipe.title || 'Recipe Image'"
      :class="imgClass"
      loading="lazy"
    />
    <div :class="contentClass">
      <h2 class="text-xl font-semibold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-1">{{ recipe.desc }}</p>
      <div class="flex flex-row items-center gap-2 flex-wrap">
        <button
        @click="openDetail"
          class="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition font-semibold"
        >
          View Recipe
        </button>
        <button
          @click="toggleFavorite(recipe.id)"
          :class="isFav ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'"
          class="px-4 py-2 text-white rounded-lg shadow transition font-semibold"
        >
          {{ isFav ? '❤️ Favorited' : '🤍 Add to Favorites' }}
        </button>
      </div>
    </div>
  </article>
</template>
