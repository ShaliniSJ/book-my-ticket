import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded,error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Italiana-Regular": require('../assets/fonts/Italiana-Regular.ttf'),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded,error]);

  if (!loaded && !error) {
    return null;
  }

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen name="index"  options={{headerShown:false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)"  options={{headerShown:false}}/>
        {/* <Stack.Screen name="(admin)"  options={{headerShown:false}}/> */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>

  );
}
