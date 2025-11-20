import { Asset } from 'expo-asset';

export const PLACEHOLDER = require('../assets/images/adaptive-icon.png');

export function getTaxonImageLocal(id: string): number {
  // In the future, switch on id to return species-specific images.
  return PLACEHOLDER;
}

export async function preloadTaxonImages(ids: string[]) {
  try {
    const assets = ids.map((id) => Asset.fromModule(getTaxonImageLocal(id)));
    await Promise.all(assets.map((a) => a.downloadAsync()));
  } catch {
    // best-effort only
  }
}

export type ImageMeta = {
  caption?: string;
  license?: string;
  attribution?: string;
  sourceUrl?: string;
};

export function getDefaultImageMeta(opts: { scientificName: string; commonNames?: string[] }): ImageMeta {
  const caption = opts.commonNames?.[0] || opts.scientificName;
  return {
    caption,
    license: 'Placeholder',
    attribution: 'Bundled placeholder image',
  };
}
