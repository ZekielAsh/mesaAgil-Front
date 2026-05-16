import {
  AppMode,
  EstablishmentRole
} from '@/constants/mockProfile';

import { useProfile } from '@/context/ProfileContext';

import { router } from 'expo-router';

import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

const establishmentRoles: EstablishmentRole[] =
  ['ADMIN', 'KITCHEN', 'EMPLOYEE'];

const ProfileSwitcher = () => {
  const {
    mode,
    role,
    setMode,
    setRole
  } = useProfile();

  const handleChangeMode = (
  newMode: AppMode
) => {
  setMode(newMode);

  if (newMode === 'CLIENT') {
    router.replace(
      '/(client)/(tabs)'
    );

    return;
  }

  router.replace(
    '/(establishment)/(tabs)/items'
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Perfil activo
      </Text>

      <View style={styles.modeContainer}>
        <Pressable
          style={[
            styles.modeButton,
            mode === 'CLIENT' &&
              styles.activeButton
          ]}
          onPress={() =>
            handleChangeMode(
              'CLIENT'
            )
          }
        >
          <Text style={styles.text}>
            Cliente
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.modeButton,
            mode ===
              'ESTABLISHMENT' &&
              styles.activeButton
          ]}
          onPress={() =>
            handleChangeMode(
              'ESTABLISHMENT'
            )
          }
        >
          <Text style={styles.text}>
            Establecimiento
          </Text>
        </Pressable>
      </View>

      {mode ===
        'ESTABLISHMENT' && (
        <View
          style={styles.rolesContainer}
        >
          {establishmentRoles.map(
            establishmentRole => (
              <Pressable
                key={
                  establishmentRole
                }
                style={[
                  styles.roleButton,
                  role ===
                    establishmentRole &&
                    styles.activeRole
                ]}
                onPress={() =>
                  setRole(
                    establishmentRole
                  )
                }
              >
                <Text
                  style={
                    styles.text
                  }
                >
                  {
                    establishmentRole
                  }
                </Text>
              </Pressable>
            )
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileSwitcher;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  modeContainer: {
    flexDirection: 'row',
    gap: 8
  },

  modeButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },

  activeButton: {
    backgroundColor: '#007AFF'
  },

  rolesContainer: {
    gap: 8
  },

  roleButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10
  },

  activeRole: {
    backgroundColor: '#34C759'
  },

  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
});