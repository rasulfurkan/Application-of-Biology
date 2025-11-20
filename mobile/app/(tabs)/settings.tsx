 import React from 'react';
 import { View, Text, Switch } from 'react-native';
 import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

 export default function SettingsScreen() {
   const { colorScheme, toggleColorScheme } = useNativeWindColorScheme();

   const isDark = colorScheme === 'dark';

   return (
     <View className="flex-1 px-4 py-6 bg-surface dark:bg-surface-dark">
       <Text className="text-2xl font-bold text-text dark:text-text-inverted mb-4">Settings</Text>

       <View className="flex-row items-center justify-between rounded-xl border border-border dark:border-border-dark p-4 bg-surface dark:bg-neutral-900">
         <View>
           <Text className="text-base font-semibold text-text dark:text-text-inverted">Dark Mode</Text>
           <Text className="text-sm text-neutral-500 dark:text-neutral-400">Current: {isDark ? 'Dark' : 'Light'}</Text>
         </View>
         <Switch value={isDark} onValueChange={toggleColorScheme} />
       </View>
     </View>
   );
 }
