<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { theme, toggleTheme } = useTheme();
const isDark = computed(() => theme.value === 'dark');
</script>

<template>
  <button
    @click="toggleTheme"
    class="px-3 py-1 rounded-lg border bg-white dark:bg-gray-800 dark:text-white"
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to light' : 'Switch to dark'"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>
