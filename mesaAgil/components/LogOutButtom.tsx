import { Pressable, StyleSheet, Text } from 'react-native';

import { Fonts } from '@/constants/fonts';
import { useAuth } from '@/hooks/useAuth';

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Pressable
      onPress={logout}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? '#a90000' : '#f00000',
          transform: [
            {
              scale: pressed ? 0.95 : 1
            }
          ]
        }
      ]}
    >
      <Text style={styles.buttonText}>Cerrar sesión</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    marginRight: 12
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.bold
  }
});
