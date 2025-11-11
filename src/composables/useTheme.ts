import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/theme';

export const useTheme = () => {
  const store = useThemeStore();
  const { theme } = storeToRefs(store);

  const setTheme = (t: 'light' | 'dark') => {
    if (typeof (store as any).setTheme === 'function') {
      (store as any).setTheme(t);
      return;
    }
    if (typeof (store as any).apply === 'function') {
      (store as any).apply(t);
      return;
    }
    (store as any).theme = t;
  };

  const toggleTheme = () => {
    if (typeof (store as any).toggle === 'function') {
      (store as any).toggle();
      return;
    }
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  return { theme: computed(() => theme.value), setTheme, toggleTheme };
};
