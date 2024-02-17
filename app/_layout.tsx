import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Pressable, useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(FontAwesome.font);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Patient Portal',
              headerRight: () => (
                <Link href="/adminPanel" replace asChild>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Switch to admin panel view"
                    accessibilityHint="Switches app mode">
                    {({ pressed }) => (
                      <FontAwesome
                        name="suitcase"
                        size={25}
                        color={theme.colors.onBackground}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="adminPanel"
            options={{
              title: 'Admin Panel',
              headerRight: () => (
                <Link href="/" replace asChild>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Switch to my tickets view"
                    accessibilityHint="Switches app mode">
                    {({ pressed }) => (
                      <FontAwesome
                        name="user"
                        size={25}
                        color={theme.colors.onBackground}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="createTicketModal"
            options={{ presentation: 'modal', title: 'Submit a ticket' }}
          />
          <Stack.Screen
            name="ticketDetails"
            options={{ title: 'Ticket details', headerBackTitleVisible: false }}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
