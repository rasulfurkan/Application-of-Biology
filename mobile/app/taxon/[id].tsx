import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFavorite } from '@/lib/favorites';
import { getDefaultImageMeta, getTaxonImageLocal } from '@/lib/images';
import { useLocalSearchParams, router } from 'expo-router';
import { getTaxonById } from '@/lib/data';

const categoryToSlug: Record<string, string> = {
  'Vertebrates': 'vertebrates',
  'Invertebrates': 'invertebrates',
  'Seed Plants': 'seed-plants',
  'Seedless Plants': 'seedless-plants',
};

export default function TaxonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const taxon = id ? getTaxonById(String(id)) : undefined;

  if (!taxon) {
    return (
      <View className="flex-1 items-center justify-center bg-surface dark:bg-surface-dark p-6">
        <Text className="text-text dark:text-text-inverted">Taxon not found.</Text>
      </View>
    );
  }

  const lineage = taxon.lineage || [];
  const catSlug = taxon.category ? categoryToSlug[taxon.category] : undefined;
  const [fav, toggleFav, loadingFav] = useFavorite(taxon.id);

  // Build an ordered rank ladder with friendly labels and subranks
  const LABELS: Record<string, string> = {
    domain: 'Domain',
    kingdom: 'Kingdom',
    regnum: 'Kingdom',
    phylum: 'Phylum',
    division: 'Division',
    classis: 'Class',
    ordo: 'Order',
    familia: 'Family',
    genus: 'Genus',
    species: 'Species',
    subphylum: 'Subphylum',
    subclassis: 'Subclass',
    infraclassis: 'Infraclass',
    superordo: 'Superorder',
    subordo: 'Suborder',
    infraordo: 'Infraorder',
    superfamilia: 'Superfamily',
    subfamilia: 'Subfamily',
    tribus: 'Tribe',
    subtribus: 'Subtribe',
  };

  const MAJOR: string[][] = [
    ['domain'],
    ['kingdom', 'regnum'],
    ['phylum', 'division'],
    ['classis'],
    ['ordo'],
    ['familia'],
    ['genus'],
    ['species'],
  ];

  const SUB_AFTER: Record<string, string[]> = {
    phylum: ['subphylum'],
    division: ['subphylum'], // keep consistent placement
    classis: ['subclassis', 'infraclassis'],
    ordo: ['superordo', 'subordo', 'infraordo'],
    familia: ['superfamilia', 'subfamilia', 'tribus', 'subtribus'],
  };

  const byRank: Record<string, string> = Object.create(null);
  for (const node of lineage) {
    byRank[String(node.rank).toLowerCase()] = node.name;
  }

  const subranks = (taxon as any).subranks as Record<string, string[]> | undefined;

  // Build ladder entries
  const ladder: { key: string; label: string; name?: string; subs: { label: string; names: string[] }[] }[] = [];
  for (const group of MAJOR) {
    const mainKey = group.find((k) => byRank[k]);
    const label = LABELS[mainKey ?? group[0]] ?? (mainKey ?? group[0]);
    const name = mainKey ? byRank[mainKey] : undefined;
    const subKeys = SUB_AFTER[mainKey ?? group[0]] ?? [];
    const subs: { label: string; names: string[] }[] = [];
    for (const sk of subKeys) {
      const names: string[] = [];
      if (byRank[sk]) names.push(byRank[sk]);
      const srList = subranks?.[sk];
      if (srList?.length) names.push(...srList);
      if (names.length) subs.push({ label: LABELS[sk] ?? sk, names });
    }
    if (name || subs.length) ladder.push({ key: (mainKey ?? group[0])!, label, name, subs });
  }

  const meta = getDefaultImageMeta({ scientificName: taxon.scientificName, commonNames: taxon.commonNames });

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark p-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold text-text dark:text-text-inverted">{taxon.scientificName}</Text>
        <View className="flex-row items-center">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={fav ? 'Remove from favorites' : 'Add to favorites'}
            onPress={toggleFav}
            disabled={loadingFav}
            className="px-2 py-2 rounded-lg border border-border dark:border-border-dark mr-2"
          >
            <MaterialIcons name={fav ? 'star' : 'star-border'} size={22} color={fav ? '#F59E0B' : '#9ca3af'} />
          </Pressable>
          <Pressable
            onPress={() => (catSlug ? router.push({ pathname: '/category/[slug]', params: { slug: catSlug } }) : router.back())}
            className="px-3 py-2 rounded-lg border border-border dark:border-border-dark"
          >
            <Text className="text-text dark:text-text-inverted">{catSlug ? 'Back to Category' : 'Back'}</Text>
          </Pressable>
        </View>
      </View>

      {/* Thumbnail (bundled placeholder for now) */}
      <View className="items-center mb-4">
        <Image
          source={getTaxonImageLocal(taxon.id)}
          style={{ width: 140, height: 140, borderRadius: 16 }}
          resizeMode="cover"
        />
        <Text className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{meta.caption}</Text>
        {(meta.attribution || meta.license) ? (
          <Text className="text-xs text-neutral-500 dark:text-neutral-400">{[meta.attribution, meta.license].filter(Boolean).join(' · ')}</Text>
        ) : null}
      </View>

      {taxon.commonNames?.length ? (
        <Text className="text-base mb-3 text-neutral-600 dark:text-neutral-300">Common: {taxon.commonNames.join(', ')}</Text>
      ) : null}

      {taxon.category ? (
        <Text className="text-sm mb-4 text-neutral-500 dark:text-neutral-400">Category: {taxon.category}</Text>
      ) : null}

      <Text className="text-lg font-semibold text-text dark:text-text-inverted mb-2">Rank ladder</Text>
      <View>
        {ladder.map((entry) => (
          <View key={entry.key} className="rounded-lg p-3 mb-2 border border-border dark:border-border-dark bg-surface dark:bg-neutral-900">
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">{entry.label}</Text>
            {entry.name ? (
              <Text className="text-base text-text dark:text-text-inverted">{entry.name}</Text>
            ) : null}
            {entry.subs.map((s) => (
              <View key={s.label} className="mt-2">
                <Text className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</Text>
                <Text className="text-sm text-text dark:text-text-inverted">{s.names.join(', ')}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
