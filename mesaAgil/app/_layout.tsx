import { AuthProvider } from '@/context/AuthContext';
import { TableSessionProvider } from '@/context/TableSessionContext';
import { WebSocketProvider } from '@/context/WebSocketContext';
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
      <TableSessionProvider>
        <WebSocketProvider>
          <ThemeProvider value={DefaultTheme}>
            <View style={styles.container}>
              <View style={styles.content}>
                <Stack
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen name="index" />

                  <Stack.Screen name="login" />

                  <Stack.Screen name="(client)/(tabs)" />

                  <Stack.Screen name="(establishment)" />

                  <Stack.Screen name="qr" />
                </Stack>
              </View>

              <StatusBar />

              <Toast config={toastConfig} />
            </View>
          </ThemeProvider>
        </WebSocketProvider>
      </TableSessionProvider>
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
