# Project Brief — Biology Systematics Application

- **Working Name**: BioSystematics Explorer
- **Goal**: Enable users to find an organism by genus/species or browse step-by-step through taxonomy within four top-level categories: Vertebrates, Invertebrates, Seed Plants, Seedless Plants. Display the organism’s full systematic classification and images.

## Users
- **Students and educators**: quick reference and learning.
- **Amateur naturalists**: identification aid and exploration.

## MVP Scope
- **Search**: Input accepts genus and species (e.g., "Panthera leo"). Handles genus-only or species-only where possible.
- **Category routing**: Map result to one of: Vertebrates, Invertebrates, Seed Plants, Seedless Plants.
- **Taxon detail**: Show ranks (Domain→Species), basic descriptors, and 1–3 images with attribution.
- **Browse flow** (with subranks):
  - Animals (Vertebrates/Invertebrates): Regnum → Phylum → Classis → Ordo → Familia → Genus → Species.
  - Plants (Seed/Seedless): Domain → Kingdom → Division → Classis → Ordo → Familia → Genus → Species.
- **Offline-first**: Bundled dataset and core images included; app works without network.
- **Mobile**: React Native (Expo) app with touch-first UI.
- **Bundled sample data**: Curated offline dataset for demo flows.

## Out of Scope (MVP)
- Advanced distribution maps, full literature, and large-scale offline bundles.
- Editing or community contributions.

## Success Criteria
- Search returns correct taxon and category for common examples.
- Browse allows reaching any sample species via hierarchical navigation in ≤6 clicks.
- Detail page loads under 1s for sample data; images render with proper licensing.

## Open Decisions / Constraints
- **Platform & stack**: Mobile app using React Native (Expo) + TypeScript + NativeWind; offline-first.
- **Datasource**: Curated, bundled JSON dataset for MVP; consider integrating Catalogue of Life/GBIF later.
- **Images**: Prefer Wikimedia/GBIF; bundle at least 1 image per species; show proper attribution and license.
- **Language**: Menu in English; taxonomy ranks and scientific names in Latin; common names optional.
- **Distribution**: Expo EAS builds; plan for app store submission later.
