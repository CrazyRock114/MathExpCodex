import { useSyncExternalStore } from 'react';

export type AppRoute =
  | { readonly name: 'catalog' }
  | { readonly name: 'experiment'; readonly experimentId: string };

const EXPERIMENT_PAGE_ROUTE = /(?:^|\/)pages\/([A-Z0-9_]+)\.html$/;
const HASH_EXPERIMENT_ROUTE = /^#(?:\/experiment\/)?([A-Z0-9_]+)$/;

export function experimentIdFromPath(pathname: string): string | null {
  return EXPERIMENT_PAGE_ROUTE.exec(pathname)?.[1] ?? null;
}

export function experimentIdFromLegacyHash(hash: string): string | null {
  return HASH_EXPERIMENT_ROUTE.exec(hash)?.[1] ?? null;
}

export function parseAppRoute(pathname: string, hash = ''): AppRoute {
  const experimentId = experimentIdFromPath(pathname) ?? experimentIdFromLegacyHash(hash);
  return experimentId ? { name: 'experiment', experimentId } : { name: 'catalog' };
}

export function catalogHref(pathname: string): string {
  return experimentIdFromPath(pathname) ? '../index.html' : './index.html';
}

export function legacyExperimentHref(experimentId: string, pathname: string): string {
  const prefix = experimentIdFromPath(pathname) ? '../' : './';
  return `${prefix}legacy.html#${experimentId}`;
}

function subscribeToLocation(callback: () => void): () => void {
  window.addEventListener('hashchange', callback);
  window.addEventListener('popstate', callback);
  return () => {
    window.removeEventListener('hashchange', callback);
    window.removeEventListener('popstate', callback);
  };
}

function getLocationSnapshot(): string {
  return `${window.location.pathname}\n${window.location.hash}`;
}

export function useAppRoute(): AppRoute {
  const snapshot = useSyncExternalStore(subscribeToLocation, getLocationSnapshot, () => '\n');
  const [pathname, hash = ''] = snapshot.split('\n');
  return parseAppRoute(pathname, hash);
}
