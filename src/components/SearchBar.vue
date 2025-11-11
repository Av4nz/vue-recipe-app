<script lang="ts" setup></script>

<template>
  <div class="flex-col md:flex-row items-center justify-center w-full gap-4">
    <div class="flex items-center gap-4 w-full">
      <div class="px-4 py-4 border bg-white border-gray-300 rounded-full shadow">
        <select class="outline-none focus:outline-none px-2">
          <option value="name">Name</option>
          <option value="ingredients">Ingredients</option>
          <option value="category">Category</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Search recipes..."
        class="w-full px-6 py-4 border bg-white border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-yellow-500 shadow"
      />
    </div>

    <div class="flex justify-center mt-4">
      <button
        class="px-6 py-4 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition font-semibold w-[175px]"
      >
        Search
      </button>
    </div>
  </div>
</template>
