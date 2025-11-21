import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, Keyboard } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { searchTaxa } from '@/lib/search';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const initial = (params.q ?? '').toString();
  const [q, setQ] = useState(initial);
  const [committed, setCommitted] = useState(initial);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (initial && initial !== committed) {
      setCommitted(initial);
      setQ(initial);
    }
  }, [initial]);

  const results = useMemo(() => (committed ? searchTaxa(committed) : []), [committed]);

  const onSubmit = () => {
    const v = q.trim();
    setCommitted(v);
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-text dark:text-text-inverted mb-4">Search</Text>

      <TextInput
        placeholder="Search genus/species, synonyms, common names"
        placeholderTextColor="#9ca3af"
        className="w-full mb-4 px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-neutral-900 text-base text-text dark:text-text-inverted"
        value={q}
        onChangeText={setQ}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        accessibilityLabel="Search input"
        accessibilityHint="Enter a query and press search to see results"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {committed ? (
        <Text className="mb-3 text-sm text-neutral-600 dark:text-neutral-300">{results.length} result(s) for "{committed}"</Text>
      ) : (
        <Text className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">Enter a query to search</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={12}
        windowSize={7}
        removeClippedSubviews
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/taxon/[id]', params: { id: item.id } })}
            className="rounded-xl p-4 border border-border dark:border-border-dark bg-surface dark:bg-neutral-900"
            accessibilityRole="button"
            accessibilityLabel={`Open taxon ${item.scientificName}`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text className="text-base font-semibold text-text dark:text-text-inverted">{item.scientificName}</Text>
            {item.commonNames?.length ? (
              <Text className="text-sm text-neutral-500 dark:text-neutral-400">{item.commonNames.join(', ')}</Text>
            ) : null}
          </Pressable>
        )}
      />
      </View>
    </View>
  );
}
