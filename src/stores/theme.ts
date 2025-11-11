import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORAGE_KEY = 'theme';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light'|'dark'>(
    (localStorage.getItem(STORAGE_KEY) as 'light'|'dark') || 'light'
  );

  const applyDOM = (t: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', t === 'dark');
    localStorage.setItem(STORAGE_KEY, t);
  };

  applyDOM(theme.value);

  const setTheme = (t: 'light' | 'dark') => {
    theme.value = t;
    applyDOM(t);
  };

  const toggle = () => setTheme(theme.value === 'dark' ? 'light' : 'dark');

  return { theme, setTheme, toggle };
});
