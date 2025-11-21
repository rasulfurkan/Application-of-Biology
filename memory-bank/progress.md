# Progress

## Phases

### Phase 0 — Planning & Foundations
- [x] Initialize Memory Bank and core docs
- [x] Choose platform and stack (React Native + Expo, offline-first)
- [x] Define 4-category mapping and rank orders (with subranks)
- [x] Decide on data source approach (bundled curated JSON) and image policy

### Phase 1 — App Skeleton & Design System
- [x] Scaffold Expo app (TypeScript) with expo-router (tabs + stacks)
- [x] Configure NativeWind with provided palette and tokens
- [x] Add Space Grotesk font and Material Icons
- [x] Implement base screens: Home, Favorites, Settings
- [x] Light/Dark theme support matching design

### Phase 2 — Data Model, Dataset & Search
- [x] Define Taxon schema (incl. subranks)
- [x] Implement category mapping rules (animals/plants)
- [x] Seed balanced dataset (≈16 species; 4 per category)
- [x] Integrate Fuse.js search (genus/species, synonyms, common names)
- [x] Category browse with breadcrumbs
- [x] Taxon Detail with full rank ladder

### Phase 3 — Images, Offline, and Polish
- [x] Bundle ≥1 thumbnail per species; cache additional images offline (all 16 taxa bundled locally)
- [x] Attribution & license display (wired to image metadata with sensible defaults)
- [x] Favorites (AsyncStorage) and Settings toggles
- [x] Accessibility/performance pass (a11y labels, larger hit targets, list virtualization)
- [x] Expo EAS build profiles and release prep (added eas.json)

## Completed
- Initialized memory bank with core files tailored to the systematics app.
- Configure NativeWind with provided palette and tokens
- Light/Dark theme support matching design
- Bundle ≥1 thumbnail per species; cache additional images offline (all 16 taxa bundled locally)
- Attribution & license display (wired to image metadata with sensible defaults)
- Favorites (AsyncStorage) and Settings toggles
- Expo EAS build profiles and release prep (added eas.json)
 - Accessibility/performance pass (a11y labels, larger hit targets, list virtualization)

## In Progress / Next

## Known Issues
- None yet; awaiting specs.

## Log
- 2025-11-19: Memory bank created and initial context drafted.
 - 2025-11-19: Phases defined and mobile/offline decisions recorded.
 - 2025-11-19: Scaffolded Expo app (tabs + expo-router, TS) in `mobile/`; wired NativeWind base, Space Grotesk font, Material Icons; added Home/Favorites/Settings tabs.
 - 2025-11-20: Phase 2 completed (schema, category mapping, dataset, Fuse.js search, browse, rank ladder). Phase 3 started: added bundled thumbnail placeholder on Taxon Detail; plan to bundle per-species images, caching, and attribution UI.
 - 2025-11-20: Phase 3 implementation: image pipeline + preloading (placeholder until assets provided), attribution/license display, Favorites with AsyncStorage and Favorites tab UI, EAS build profiles.
 - 2025-11-20: Accessibility/performance pass across Home, Category, Search, Favorites, and Taxon screens; aligned async-storage and expo-asset versions with Expo.
 - 2025-11-20: Per-species CC images bundled locally for all taxa (including alternates for Drosophila melanogaster and Sphagnum palustre); wired metadata and fallback.
