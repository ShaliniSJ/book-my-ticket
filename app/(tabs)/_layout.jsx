import { Tabs } from 'expo-router';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack>
        {/* Landing Page (Home) */}
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
        {/* Chat Page */}
        <Stack.Screen
          name="chat"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
