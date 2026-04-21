import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

// La ruta no sera dinamica, guardar id de order actual en un singleton al habilitar mesa
// Flujo:
// -> Hablitan la mesa
// -> la app cliente crea una orden en la BD para esa mesa
// -> recibe la orden del back y lo guarda en un singleton
// -> cuando cierran mesa guarda el pedido final en la BD y limpia singleton
// Nota:
// -> En home habra un modal lateral que cuando agregues una comida se agregara ahi
//    sera como un carrito en el cual habra un boton para agregar comidas al pedido
// -> Cuando agregas una comida al carrito podes sumar mas cantidad de esa comida o eliminarla
// -> Si ya apretaste el boton de pedir comidas del carrito ya no podras eliminarlas del pedido
//    (se lo dejamos al restaurante que solucione eso o del lado de mozos permitir que accedan
//     al pedido de una mesa y modificarlo)
export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar />
    </ThemeProvider>
  );
}
