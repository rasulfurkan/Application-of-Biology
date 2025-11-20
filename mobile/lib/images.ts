import { Asset } from 'expo-asset';

export const PLACEHOLDER = require('../assets/images/adaptive-icon.png');

export function getTaxonImageLocal(id: string): number {
  const m = MAP[id];
  return m?.src ?? PLACEHOLDER;
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

export function getTaxonImageMeta(
  id: string,
  fallback: { scientificName: string; commonNames?: string[] }
): ImageMeta {
  const m = MAP[id]?.meta;
  return m ?? getDefaultImageMeta(fallback);
}

// Local mapping of taxon id -> bundled image and source metadata
const MAP: Record<string, { src: number; meta: ImageMeta }> = {
  'animal-panthera-leo': {
    src: require('../assets/images/taxa/animal-panthera-leo.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Panthera_leo_5.JPG',
    },
  },
  'animal-homo-sapiens': {
    src: require('../assets/images/taxa/animal-homo-sapiens.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Homo_Sapiens_Idaltu.JPG',
    },
  },
  'animal-gallus-gallus': {
    src: require('../assets/images/taxa/animal-gallus-gallus.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Gallus_gallus,_red_junglefowl_(non_domestic)_-_Khao_Yai_National_Park_(11882083433).jpg',
    },
  },
  'animal-salmo-salar': {
    src: require('../assets/images/taxa/animal-salmo-salar.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Salmo_salar-Atlantic_Salmon-Atlanterhavsparken_Norway_(cropped).JPG',
    },
  },

  'invert-drosophila-melanogaster': {
    src: require('../assets/images/taxa/invert-drosophila-melanogaster.jpg'),
    meta: {
      license: 'See source',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Standing_female_Drosophila_melanogaster.jpg',
    },
  },
  'invert-octopus-vulgaris': {
    src: require('../assets/images/taxa/invert-octopus-vulgaris.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Octopus_vulgaris_02.JPG',
    },
  },
  'invert-apis-mellifera': {
    src: require('../assets/images/taxa/invert-apis-mellifera.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Apis_mellifera_2_Luc_Viatour.JPG',
    },
  },
  'invert-culex-pipiens': {
    src: require('../assets/images/taxa/invert-culex-pipiens.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Culex_pipiens_03.JPG',
    },
  },

  'seed-arabidopsis-thaliana': {
    src: require('../assets/images/taxa/seed-arabidopsis-thaliana.jpg'),
    meta: {
      license: 'CC BY-SA/GFDL (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Arabidopsis_Thaliana_planted_in_Laboratory.JPG',
    },
  },
  'seed-zea-mays': {
    src: require('../assets/images/taxa/seed-zea-mays.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zea_mays_004.JPG',
    },
  },
  'seed-pinus-sylvestris': {
    src: require('../assets/images/taxa/seed-pinus-sylvestris.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pinus_sylvestris_004.JPG',
    },
  },
  'seed-rosa-canina': {
    src: require('../assets/images/taxa/seed-rosa-canina.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rosa_canina_6.JPG',
    },
  },

  'seedless-pteridium-aquilinum': {
    src: require('../assets/images/taxa/seedless-pteridium-aquilinum.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pteridium_aquilinum.JPG',
    },
  },
  'seedless-marchantia-polymorpha': {
    src: require('../assets/images/taxa/seedless-marchantia-polymorpha.jpg'),
    meta: {
      license: 'CC BY-SA (see source)',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Marchantia_polymorpha_(parapluutjesmos).JPG',
    },
  },
  'seedless-sphagnum-palustre': {
    src: require('../assets/images/taxa/seedless-sphagnum-palustre.jpg'),
    meta: {
      license: 'See source',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Riezlern-hiking_path_Schwende-sign_Sphagnum_palustre-01ASD.jpg',
    },
  },
  'seedless-lycopodium-clavatum': {
    src: require('../assets/images/taxa/seedless-lycopodium-clavatum.jpg'),
    meta: {
      license: 'See source',
      attribution: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lycopodium_clavatum_01.JPG',
    },
  },
};
