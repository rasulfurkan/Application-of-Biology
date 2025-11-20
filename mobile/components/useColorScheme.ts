import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

export function useColorScheme(): 'light' | 'dark' | null {
  const { colorScheme } = useNativeWindColorScheme();
  return (colorScheme as 'light' | 'dark' | null) ?? null;
}

export const useThemeController = useNativeWindColorScheme;
