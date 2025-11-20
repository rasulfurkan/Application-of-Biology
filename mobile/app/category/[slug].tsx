import React from 'react';
 import { View, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getTaxa } from '@/lib/data';

const slugToCategory: Record<string, 'Vertebrates' | 'Invertebrates' | 'Seed Plants' | 'Seedless Plants'> = {
  'vertebrates': 'Vertebrates',
  'invertebrates': 'Invertebrates',
  'seed-plants': 'Seed Plants',
  'seedless-plants': 'Seedless Plants',
};

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const category = slug ? slugToCategory[String(slug).toLowerCase()] : undefined;

  const { all } = getTaxa();
  const items = category ? all.filter((t) => t.category === category) : [];

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark p-4">
      <View className="flex-row items-center mb-2">
        <Pressable onPress={() => router.push({ pathname: '/(tabs)' })}>
          <Text className="text-sm text-neutral-500 dark:text-neutral-400 underline">Home</Text>
        </Pressable>
        <Text className="mx-2 text-neutral-400 dark:text-neutral-600">/</Text>
        <Text className="text-sm text-neutral-700 dark:text-neutral-300">{category ?? 'Category'}</Text>
      </View>
      <Text className="text-2xl font-bold text-text dark:text-text-inverted mb-4">{category ?? 'Category'}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={12}
        windowSize={7}
        removeClippedSubviews
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: '/taxon/[id]', params: { id: item.id } })
            }
            className="rounded-xl p-4 border border-border dark:border-border-dark bg-surface dark:bg-neutral-900"
            accessibilityRole="button"
            accessibilityLabel={`Open taxon ${item.scientificName}`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text className="text-lg font-semibold text-text dark:text-text-inverted">
              {item.scientificName}
            </Text>
            {item.commonNames?.length ? (
              <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                {item.commonNames.join(', ')}
              </Text>
            ) : null}
          </Pressable>
        )}
      />
    </View>
  );
}
