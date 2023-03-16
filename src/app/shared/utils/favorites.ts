import { LOCAL_STORAGE_KEY } from '../constants/storage';

export function addToFavorites(id: number): void {
  const entries = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  entries.push(id);

  const unique = [...new Set(entries).values()];

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unique));
}

export function getFavorites(): number[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
}

export function removeFromFavorites(id: number) {
  const entries: number[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const filtered = entries.filter(value => value !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
}
