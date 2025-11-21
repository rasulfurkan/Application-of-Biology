 import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
 import { Stack } from 'expo-router';
 import * as SplashScreen from 'expo-splash-screen';
 import { useEffect } from 'react';
 import 'react-native-reanimated';
 import '../global.css';
 import { useFonts, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import MaterialIcons from '@expo/vector-icons/MaterialIcons';
 import { preloadTaxonImages } from '@/lib/images';
 import { getTaxa } from '@/lib/data';
 
 import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    ...MaterialIcons.font,
  });

  // Handle font load errors gracefully on web/native.
  useEffect(() => {
    if (error) {
      // Log message and stack explicitly so aggregated consoles don't show just `{}`
      const anyErr = error as unknown as { message?: string; stack?: string };
      console.error('[Fonts]', anyErr?.message ?? error, anyErr?.stack ?? '');
    }
  }, [error]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Preload any local images in the background after mount.
  useEffect(() => {
    try {
      const ids = getTaxa().all.map((t) => t.id);
      preloadTaxonImages(ids);
    } catch {}
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="category/[slug]" options={{ headerShown: false }} />
          <Stack.Screen name="taxon/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
