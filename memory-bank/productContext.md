# Product Context

## Why
- Provide a clear, educational way to search and browse biological classification, tied to a small set of curated examples that demonstrate the taxonomy hierarchy and category mapping.

## UX Goals
- Mobile-first, offline-capable experience with fast interactions.
- Simple search-first experience, with predictable results.
- Transparent breadcrumbs and rank-by-rank navigation including subranks.
- Clear category placement (Invertebrates, Vertebrates, Seed Plants, Seedless Plants).
- Trustworthy content with proper image attribution.

## Key User Flows
- **Search to Detail**: Enter genus/species → see best match → view classification + images.
- **Browse by Category**: Choose one of 4 categories → drill down ranks → reach species.
- **Backtrack/Breadcrumbs**: Navigate up and across ranks easily.

## Design Reference
- Follow the provided Tailwind design (colors, typography, layout) adapted to React Native via NativeWind.
- Bottom tab navigation: Home, Favorites, Settings. Home includes search bar and 4-category grid.
- Support light/dark themes mapped to the given color tokens.

## Content Policy
- Cite authoritative taxonomic sources. Attribute images and respect licenses.
- Show last-updated/source for the record where possible.

## Accessibility & Localization
- High-contrast, mobile-friendly UI with large touch targets. English menus; taxonomy ranks and scientific names in Latin. Future i18n possible.
