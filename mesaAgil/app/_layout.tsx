import ProfileSwitcher from '@/components/profile/ProfileSwitcher';
import { AuthProvider } from '@/context/AuthContext';
import { ProfileProvider } from '@/context/ProfileContext';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar, StyleSheet, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  });

  if (!loaded) {
    return null;
  }

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#58c400',
          borderLeftWidth: 8,
          height: 48
        }}
        contentContainerStyle={{
          paddingHorizontal: 16
        }}
        text1Style={{
          fontSize: 16,
          fontFamily: 'Inter_600SemiBold'
        }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: '#c40000',
          borderLeftWidth: 8
        }}
        contentContainerStyle={{
          paddingHorizontal: 16
        }}
        text1Style={{
          fontSize: 16,
          fontFamily: 'Inter_600SemiBold'
        }}
      />
    )
  };

  return (
    <AuthProvider>
      <ProfileProvider>
        <ThemeProvider value={DefaultTheme}>
          <View style={styles.container}>
            <ProfileSwitcher />

            <View style={styles.content}>
              <Stack
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="(client)/(tabs)" />

                <Stack.Screen name="(establishment)/index" />
              </Stack>
            </View>
            <StatusBar />
            <Toast config={toastConfig} />
          </View>
        </ThemeProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1
  }
});
