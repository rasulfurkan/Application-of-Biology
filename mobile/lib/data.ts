import type { Taxon, TaxonIndex } from './types/taxon';
import { mapCategory } from './category';

// Load bundled sample data without requiring TS resolveJsonModule
// eslint-disable-next-line @typescript-eslint/no-var-requires
const raw: Taxon[] = require('../assets/data/taxa.sample.json');

let cache: TaxonIndex | null = null;

export function getTaxa(): TaxonIndex {
  if (cache) return cache;

  const all: Taxon[] = raw.map((t) => ({
    ...t,
    category: mapCategory(t),
  }));

  const byId: Record<string, Taxon> = Object.create(null);
  for (const t of all) byId[t.id] = t;

  cache = { all, byId };
  return cache;
}

export function getTaxonById(id: string): Taxon | undefined {
  const { byId } = getTaxa();
  return byId[id];
}
