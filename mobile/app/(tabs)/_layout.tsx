import React from 'react';
 import { MaterialIcons } from '@expo/vector-icons';
 import { Link, Tabs } from 'expo-router';
 import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof MaterialIcons>['name'];
   color: string;
 }) {
   return <MaterialIcons size={26} style={{ marginBottom: -3 }} {...props} />;
 }

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
     <Tabs
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
         headerShown: useClientOnlyValue(false, true),
       }}>
       <Tabs.Screen
         name="index"
         options={{
           title: 'Home',
           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
           headerRight: () => (
             <Link href="/modal" asChild>
               <Pressable>
                 {({ pressed }) => (
                   <MaterialIcons
                     name="info"
                     size={24}
                     color={Colors[colorScheme ?? 'light'].text}
                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                   />
                 )}
               </Pressable>
             </Link>
           ),
         }}
       />
       <Tabs.Screen
         name="favorites"
         options={{
           title: 'Favorites',
           tabBarIcon: ({ color }) => <TabBarIcon name="favorite" color={color} />,
         }}
       />
       <Tabs.Screen
         name="settings"
         options={{
           title: 'Settings',
           tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
         }}
       />
       <Tabs.Screen name="two" options={{ href: null }} />
     </Tabs>
  );
}
