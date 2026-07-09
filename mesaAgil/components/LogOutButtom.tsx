import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet } from 'react-native';

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
      <MaterialIcons name="exit-to-app" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderRadius: 100,
    marginRight: 16
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.bold
  }
});
