import {
  AppMode,
  EstablishmentRole
} from '@/constants/mockProfile';

import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

interface Props {
  mode: AppMode;
  role: EstablishmentRole;

  onChangeMode: (mode: AppMode) => void;

  onChangeRole: (
    role: EstablishmentRole
  ) => void;
}

const establishmentRoles: EstablishmentRole[] = [
  'ADMIN',
  'KITCHEN',
  'EMPLOYEE'
];

const ProfileSwitcher = ({
  mode,
  role,
  onChangeMode,
  onChangeRole
}: Props) => {
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
            onChangeMode('CLIENT')
          }
        >
          <Text style={styles.buttonText}>
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
            onChangeMode(
              'ESTABLISHMENT'
            )
          }
        >
          <Text style={styles.buttonText}>
            Establecimiento
          </Text>
        </Pressable>
      </View>

      {mode ===
        'ESTABLISHMENT' && (
        <View style={styles.rolesContainer}>
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
                  onChangeRole(
                    establishmentRole
                  )
                }
              >
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  {establishmentRole}
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
    padding: 16,
    backgroundColor: '#222',
    gap: 12
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 8
  },
  modeButton: {
    flex: 1,
    backgroundColor: '#444',
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
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10
  },
  activeRole: {
    backgroundColor: '#34C759'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});