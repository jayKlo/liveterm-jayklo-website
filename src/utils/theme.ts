import { useSyncExternalStore } from 'react';

export type Theme = 'system' | 'light' | 'dark';

const storageKey = 'jayklo-theme';
const changeEvent = 'jayklo-theme-change';
let fallback: Theme | null = null;

const isTheme = (value: string | null): value is Theme =>
  value === 'system' || value === 'light' || value === 'dark';

const getSnapshot = (): Theme => {
  if (fallback) return fallback;
  try {
    const stored = window.localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
};

const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(changeEvent, onChange);
  };
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'system');

  const setTheme = (value: Theme) => {
    try {
      window.localStorage.setItem(storageKey, value);
      fallback = null;
    } catch {
      // Keep the selector usable when browser storage is unavailable.
      fallback = value;
    }
    window.dispatchEvent(new Event(changeEvent));
  };

  return { theme, setTheme };
};
