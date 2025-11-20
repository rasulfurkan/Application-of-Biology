import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';

const KEY = 'favorites:v1';
let cache: Set<string> | null = null;
const listeners = new Set<() => void>();

async function ensureLoaded() {
  if (cache) return;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr: string[] = raw ? JSON.parse(raw) : [];
    cache = new Set(arr);
  } catch {
    cache = new Set();
  }
}

async function save() {
  if (!cache) return;
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(Array.from(cache)));
  } catch {
    // ignore
  }
}

function notify() {
  for (const fn of Array.from(listeners)) fn();
}

export async function toggleFavorite(id: string) {
  await ensureLoaded();
  if (!cache) cache = new Set();
  if (cache.has(id)) cache.delete(id);
  else cache.add(id);
  await save();
  notify();
}

export async function clearFavorites() {
  cache = new Set();
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
  notify();
}

export async function isFavoriteAsync(id: string) {
  await ensureLoaded();
  return cache ? cache.has(id) : false;
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getFavoritesSync(): Set<string> {
  return cache ?? new Set();
}

export function useFavorite(id: string): [boolean, () => void, boolean] {
  const [ready, setReady] = useState<boolean>(!!cache);
  const [fav, setFav] = useState<boolean>(cache?.has(id) ?? false);

  useEffect(() => {
    let mounted = true;
    ensureLoaded().then(() => {
      if (!mounted) return;
      setReady(true);
      setFav(cache?.has(id) ?? false);
    });
    const unsub = subscribe(() => mounted && setFav(cache?.has(id) ?? false));
    return () => {
      mounted = false;
      unsub();
    };
  }, [id]);

  const toggle = useCallback(() => {
    toggleFavorite(id);
  }, [id]);

  return [fav, toggle, !ready];
}

export function useFavorites(): [string[], boolean] {
  const [ready, setReady] = useState<boolean>(!!cache);
  const [list, setList] = useState<string[]>(Array.from(cache ?? []));

  useEffect(() => {
    let mounted = true;
    ensureLoaded().then(() => {
      if (!mounted) return;
      setReady(true);
      setList(Array.from(cache ?? []));
    });
    const unsub = subscribe(() => mounted && setList(Array.from(cache ?? [])));
    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  return [list, !ready];
}
