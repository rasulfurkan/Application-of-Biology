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
- [ ] Define Taxon schema (incl. subranks)
- [ ] Implement category mapping rules (animals/plants)
- [ ] Seed balanced dataset (≈16 species; 4 per category)
- [ ] Integrate Fuse.js search (genus/species, synonyms, common names)
- [ ] Category browse with breadcrumbs
- [ ] Taxon Detail with full rank ladder

### Phase 3 — Images, Offline, and Polish
- [ ] Bundle ≥1 thumbnail per species; cache additional images offline
- [ ] Attribution & license display
- [ ] Favorites (AsyncStorage) and Settings toggles
- [ ] Accessibility/performance pass
- [ ] Expo EAS build profiles and release prep

## Completed
- Initialized memory bank with core files tailored to the systematics app.
- Configure NativeWind with provided palette and tokens
- Light/Dark theme support matching design

## In Progress / Next
- Define data schema and category mapping rules.
- Plan balanced starter list and attribution approach.
- Start dev server with cache clear and verify base screens.

## Known Issues
- None yet; awaiting specs.

## Log
- 2025-11-19: Memory bank created and initial context drafted.
 - 2025-11-19: Phases defined and mobile/offline decisions recorded.
 - 2025-11-19: Scaffolded Expo app (tabs + expo-router, TS) in `mobile/`; wired NativeWind base, Space Grotesk font, Material Icons; added Home/Favorites/Settings tabs.
