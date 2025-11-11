<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref('');
const filterType = ref('name');

const emit = defineEmits<{
  search: [{ query: string; filterType: string}]
}>();

const handleSearch = () => {
  emit('search', {
    query: searchQuery.value,
    filterType: filterType.value,
  });
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};
</script>

<template>
  <div class="flex-col md:flex-row items-center justify-center w-full gap-4">
    <div class="flex items-center gap-4 w-full">
      <div class="">
        <select v-model="filterType" class="outline-none focus:outline-none px-4 py-4 border bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 border-gray-300 rounded-lg shadow">
          <option value="name">Name</option>
          <option value="ingredients">Ingredients</option>
          <option value="category">Category</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Search recipes..."
        class="w-full px-6 py-4 border bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 shadow"
        v-model="searchQuery"
        @keydown="handleKeydown"
      />
    </div>

    <div class="flex justify-center mt-8">
      <button
        class="px-6 py-4 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition font-semibold w-[150px]"
        @click="handleSearch"
      >
        Search
      </button>
    </div>
  </div>
</template>
