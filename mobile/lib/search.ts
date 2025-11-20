import Fuse from 'fuse.js';
import type { Taxon } from './types/taxon';
import { getTaxa } from './data';

let fuse: Fuse<Taxon> | null = null;

function getFuse(): Fuse<Taxon> {
  if (fuse) return fuse;
  const { all } = getTaxa();
  fuse = new Fuse(all, {
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2,
    keys: [
      { name: 'scientificName', weight: 0.6 },
      { name: 'canonicalName', weight: 0.3 },
      { name: 'commonNames', weight: 0.25 },
      { name: 'synonyms', weight: 0.2 },
    ],
  });
  return fuse;
}

export function searchTaxa(query: string, limit = 20): Taxon[] {
  const q = (query || '').trim();
  if (!q) return [];
  const f = getFuse();
  return f
    .search(q, { limit })
    .map((r) => r.item);
}
