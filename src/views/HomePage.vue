<script lang="ts" setup>
import SearchBar from '@/components/SearchBar.vue'
</script>
<template>
  <section class="flex flex-col justify-center items-center container p-4">
    <h1 class="text-4xl font-bold mb-4 text-center">Recipe Collection App</h1>
    <p class="text-lg text-gray-600">Discover and save your favorite recipes!</p>

    <div class="my-12 w-full max-w-[750px]">
      <SearchBar />
    </div>
  </section>
</template>
