import type { Category, Taxon } from './types/taxon';

const includesName = (lineage: { name: string }[], ...targets: string[]) => {
  const set = new Set(lineage.map((n) => n.name.toLowerCase()));
  return targets.some((t) => set.has(t.toLowerCase()));
};

export function mapCategory(taxon: Taxon): Category {
  const lineage = taxon.lineage || [];

  // High-level kingdoms
  const isAnimal = includesName(lineage, 'Animalia');
  const isPlant = includesName(lineage, 'Plantae', 'Viridiplantae');

  if (isAnimal) {
    // Vertebrates vs. Invertebrates
    if (
      includesName(
        lineage,
        'Vertebrata',
        'Chordata',
        'Mammalia',
        'Aves',
        'Reptilia',
        'Amphibia',
        'Actinopterygii',
        'Chondrichthyes',
        'Sarcopterygii'
      )
    ) {
      return 'Vertebrates';
    }
    return 'Invertebrates';
  }

  if (isPlant) {
    // Seed Plants
    const seedPlants = [
      'Spermatophyta',
      // flowering plants and gymnosperms by divisions
      'Magnoliophyta',
      'Pinophyta',
      'Gnetophyta',
      'Cycadophyta',
      'Ginkgophyta',
    ];

    // Seedless Plants (bryophytes and ferns/relatives)
    const seedless = [
      'Bryophyta',
      'Marchantiophyta',
      'Anthocerotophyta',
      'Lycopodiophyta',
      'Monilophyta',
      'Pteridophyta',
    ];

    if (includesName(lineage, ...seedPlants)) return 'Seed Plants';
    if (includesName(lineage, ...seedless)) return 'Seedless Plants';

    // Fallback: many modern classifications still place flowering/gymnosperm divisions explicitly.
    return 'Seed Plants';
  }

  // Fallback to provided category if any
  if (taxon.category) return taxon.category;

  // Conservative default
  return 'Invertebrates';
}
