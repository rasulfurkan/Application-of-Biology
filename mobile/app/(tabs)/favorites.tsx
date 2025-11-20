import React, { useMemo } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFavorites, useFavorite } from '@/lib/favorites';
import { getTaxonById } from '@/lib/data';
import { router } from 'expo-router';

export default function FavoritesScreen() {
  const [ids] = useFavorites();

  const items = useMemo(() => ids.map((id) => getTaxonById(id)).filter(Boolean), [ids]);

  if (!items.length) {
    return (
      <View className="flex-1 items-center justify-center bg-surface dark:bg-surface-dark p-6">
        <Text className="text-base text-neutral-600 dark:text-neutral-300">No favorites yet. Tap the star on a taxon.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark p-4">
      <Text className="text-2xl font-bold text-text dark:text-text-inverted mb-3">Favorites</Text>
      <FlatList
        data={items}
        keyExtractor={(t) => t!.id}
        renderItem={({ item }) => <FavRow id={item!.id} name={item!.scientificName} />}
        initialNumToRender={12}
        windowSize={7}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <View className="h-px bg-border dark:bg-border-dark my-2" />}
      />
    </View>
  );
}

function FavRow({ id, name }: { id: string; name: string }) {
  const [fav, toggle] = useFavorite(id);
  return (
    <View className="flex-row items-center justify-between">
      <Pressable
        onPress={() => router.push({ pathname: '/taxon/[id]', params: { id } })}
        className="flex-1 pr-3"
        accessibilityRole="button"
        accessibilityLabel={`Open taxon ${name}`}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text className="text-base text-text dark:text-text-inverted">{name}</Text>
      </Pressable>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={fav ? 'Remove from favorites' : 'Add to favorites'}
        className="px-2 py-1 rounded-lg border border-border dark:border-border-dark"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <MaterialIcons name={fav ? 'star' : 'star-border'} size={22} color={fav ? '#F59E0B' : '#9ca3af'} />
      </Pressable>
    </View>
  );
}
