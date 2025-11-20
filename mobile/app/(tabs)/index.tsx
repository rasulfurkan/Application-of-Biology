  import React, { useState, useCallback } from 'react';
 import { View, Text, TextInput, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [q, setQ] = useState('');

  const submitSearch = useCallback(() => {
    const query = q.trim();
    if (query.length) {
      router.push({ pathname: '/search', params: { q: query } });
    }
  }, [q]);

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark p-4">
      <Text className="text-2xl font-bold mb-4 text-text dark:text-text-inverted">Home</Text>
      <TextInput
        placeholder="Search genus or species..."
        placeholderTextColor="#9ca3af"
        className="w-full mb-4 px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-neutral-900 text-base"
        value={q}
        onChangeText={setQ}
        returnKeyType="search"
        onSubmitEditing={submitSearch}
        accessibilityLabel="Search input"
        accessibilityHint="Enter a genus or species and press search"
      />

      <View className="flex-row flex-wrap -mx-2">
        <View className="w-1/2 p-2">
          <Pressable
            onPress={() => router.push({ pathname: '/category/[slug]', params: { slug: 'vertebrates' } })}
            className="rounded-2xl h-28 items-center justify-center bg-category-vertebrates"
            accessibilityRole="button"
            accessibilityLabel="Browse Vertebrates"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialIcons name="pets" size={28} color="#fff" />
            <Text className="mt-2 text-category-vertebrates-fg font-semibold">Vertebrates</Text>
          </Pressable>
        </View>

        <View className="w-1/2 p-2">
          <Pressable
            onPress={() => router.push({ pathname: '/category/[slug]', params: { slug: 'invertebrates' } })}
            className="rounded-2xl h-28 items-center justify-center bg-category-invertebrates"
            accessibilityRole="button"
            accessibilityLabel="Browse Invertebrates"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialIcons name="bug-report" size={28} color="#111827" />
            <Text className="mt-2 text-category-invertebrates-fg font-semibold">Invertebrates</Text>
          </Pressable>
        </View>

        <View className="w-1/2 p-2">
          <Pressable
            onPress={() => router.push({ pathname: '/category/[slug]', params: { slug: 'seed-plants' } })}
            className="rounded-2xl h-28 items-center justify-center bg-category-seedPlants"
            accessibilityRole="button"
            accessibilityLabel="Browse Seed Plants"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialIcons name="eco" size={28} color="#fff" />
            <Text className="mt-2 text-category-seedPlants-fg font-semibold">Seed Plants</Text>
          </Pressable>
        </View>

        <View className="w-1/2 p-2">
          <Pressable
            onPress={() => router.push({ pathname: '/category/[slug]', params: { slug: 'seedless-plants' } })}
            className="rounded-2xl h-28 items-center justify-center bg-category-seedlessPlants"
            accessibilityRole="button"
            accessibilityLabel="Browse Seedless Plants"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialIcons name="spa" size={28} color="#fff" />
            <Text className="mt-2 text-category-seedlessPlants-fg font-semibold">Seedless Plants</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
