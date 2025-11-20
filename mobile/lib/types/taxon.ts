export type Category = 'Vertebrates' | 'Invertebrates' | 'Seed Plants' | 'Seedless Plants';

export type TaxonRank =
  | 'domain'
  | 'kingdom'
  | 'regnum'
  | 'phylum'
  | 'division'
  | 'classis'
  | 'ordo'
  | 'familia'
  | 'genus'
  | 'species';

export type SubrankKey =
  | 'subphylum'
  | 'subclassis'
  | 'infraclassis'
  | 'superordo'
  | 'subordo'
  | 'infraordo'
  | 'superfamilia'
  | 'subfamilia'
  | 'tribus'
  | 'subtribus';

export type LineageNode = {
  rank: TaxonRank | SubrankKey | string;
  name: string;
};

export type ImageAttribution = {
  uri: string; // local bundled or remote
  caption?: string;
  license?: string; // e.g., CC BY-SA 4.0
  attribution?: string; // e.g., "Wikimedia Commons: Author"
  sourceUrl?: string;
};

export type SourceRef = {
  title: string;
  url?: string;
  publisher?: string;
  accessed?: string; // ISO date
};

export interface Taxon {
  id: string;
  scientificName: string; // full binomial or canonical for higher ranks
  canonicalName: string; // genus or species epithet if applicable
  rank: TaxonRank;
  parentId?: string;
  lineage: LineageNode[]; // ordered root -> current
  category?: Category; // computed client-side
  subranks?: Partial<Record<SubrankKey, string[]>>;
  commonNames?: string[];
  synonyms?: string[];
  images?: ImageAttribution[];
  sourceRefs?: SourceRef[];
  notes?: string;
}

export interface TaxonIndex {
  byId: Record<string, Taxon>;
  all: Taxon[];
}
