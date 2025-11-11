// ...existing code...
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface Recipe {
  id: number;
  title: string;
  desc: string;
  image?: string;
  ingredients?: string[];
  category?: string;
}

defineProps<{
  recipe: Recipe | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => emit('close');
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center"
    aria-modal="true"
    role="dialog"
  >

    <div
      class="absolute inset-0 bg-black/50"
      @click="close"
    ></div>


    <div class="relative z-10 w-full max-w-3xl bg-white  dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg overflow-hidden">
      <div class="flex justify-between items-center p-4 border-b">
        <h3 class="text-xl font-semibold">{{ recipe?.title }}</h3>
        <button @click="close" aria-label="Close" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">✕</button>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-1">
          <img :src="recipe?.image || 'https://placehold.co/600x400'" :alt="recipe?.title" class="w-full h-48 object-cover rounded" />
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-400"><strong>Category:</strong> {{ recipe?.category || '—' }}</p>
        </div>

        <div class="md:col-span-2">
          <h4 class="font-semibold mb-2">Description</h4>
          <p class="text-gray-700 mb-4 dark:text-gray-400">{{ recipe?.desc }}</p>

          <h4 class="font-semibold mb-2">Ingredients</h4>
          <ul class="list-disc ml-5 text-gray-700 dark:text-gray-400">
            <li v-for="(ing, i) in recipe?.ingredients || []" :key="i">{{ ing }}</li>
            <li v-if="!(recipe?.ingredients && recipe.ingredients.length)" class="text-gray-400">No ingredients provided.</li>
          </ul>
        </div>
      </div>

      <div class="p-4 border-t flex justify-end gap-2">
        <button @click="close" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-900 text-gray-700">Close</button>
      </div>
    </div>
  </div>
</template>
