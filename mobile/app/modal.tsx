import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Linking, Pressable } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>Made by 'Rasul Furkan Ozgun'</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.sectionTitle}>Sources</Text>
      <View style={styles.list}>
        <Text style={styles.item}>
          • Taxon images and metadata: Wikimedia Commons
        </Text>
        <Pressable onPress={() => Linking.openURL('https://commons.wikimedia.org/')}>
          <Text style={styles.link}>https://commons.wikimedia.org/</Text>
        </Pressable>
        <Text style={styles.item}>
          • Sample taxonomy data: assets/data/taxa.sample.json (bundled)
        </Text>
        <Text style={styles.item}>
          • Built with: Expo, React Native, expo-router, @expo/vector-icons (MaterialIcons)
        </Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    width: '80%',
  },
  item: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  link: {
    color: '#3b82f6',
    marginBottom: 8,
  },
});
