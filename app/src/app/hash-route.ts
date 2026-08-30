import { useSyncExternalStore } from 'react';

export type AppRoute =
  | { readonly name: 'catalog' }
  | { readonly name: 'experiment'; readonly experimentId: string };

const EXPERIMENT_ROUTE = /^#\/experiment\/([A-Z0-9_]+)$/;

export function parseHashRoute(hash: string): AppRoute {
  const match = EXPERIMENT_ROUTE.exec(hash);
  if (match?.[1]) {
    return { name: 'experiment', experimentId: match[1] };
  }
  return { name: 'catalog' };
}

function subscribeToHash(callback: () => void): () => void {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHashSnapshot(): string {
  return window.location.hash;
}

export function useHashRoute(): AppRoute {
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, () => '');
  return parseHashRoute(hash);
}

