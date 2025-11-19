# Tech Context

## Chosen Stack
- **Framework**: React Native (Expo) + TypeScript
- **Routing**: expo-router (tabs + stacks)
- **Styling**: NativeWind (Tailwind-like) with design tokens matching provided palette
- **Fonts**: Space Grotesk via expo-google-fonts
- **Icons**: @expo/vector-icons (MaterialIcons)
- **State**: Lightweight (Zustand or React Context) for MVP
- **Search**: Fuse.js for fuzzy client search over bundled index
- **Data**: Bundled JSON dataset (assets) with taxonomy; category mapping computed client-side
- **Offline**: Offline-first; AsyncStorage for local data; expo-file-system for image cache; at least 1 bundled thumbnail per species

## Testing
- Jest + @testing-library/react-native
- Optional E2E later (Detox)

## Build & Deployment
- Expo EAS builds (Android/iOS); dev/preview/prod profiles
- Store submission preparations in Phase 3

## Dev Setup (MVP)
- Node LTS, pnpm/yarn, lint/format (ESLint/Prettier), TS strict

## Open Decisions
- Future API integration (Catalogue of Life/GBIF) and sync model
- App store metadata and future localization
