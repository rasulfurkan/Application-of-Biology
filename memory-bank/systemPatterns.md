# System Patterns

## Architecture
- **Mobile (React Native + Expo, offline-first)**: Bundle a curated JSON dataset and core images with the app. Use client-side fuzzy search and local storage/cache. Optional later API integration.

## Data Model (MVP)
- **Taxon**: id, scientificName, canonicalName, rank, parentId, lineage (array), category (one of 4), subranks (object of arrays, e.g., subclassis, infraordo), commonNames[], synonyms[], images[], sourceRefs[], notes.
- **Category mapping rules**:
  - Animals: Vertebrata mapped to "Vertebrates"; remaining Animalia mapped to "Invertebrates".
  - Plants: Spermatophyta mapped to "Seed Plants"; Bryophyta/Lycopodiophyta/Monilophyta etc. mapped to "Seedless Plants".

## Search
- Normalize input (trim, lowercase, accent-insensitive). Support genus+species and genus-only. Optional fuzzy match within threshold.
 - Index canonical scientific names, synonyms, and common names.

## UI Composition
- Screens/components: SearchBar, CategoryGrid, RankList, Breadcrumbs, TaxonCard, TaxonDetail.
- Navigation: Bottom tabs (Home, Favorites, Settings) + stack screens (Category, TaxonDetail, SearchResults).
- Theming: Light/Dark via design tokens mapped from provided Tailwind palette.

## Images
- Prefer Wikimedia/GBIF images with attribution; bundle at least one thumbnail per species for offline use; cache additional images on demand. Store attribution and license per image.
