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
import { useState } from 'react';

const establishmentRoles: EstablishmentRole[] =
  ['ADMIN', 'KITCHEN', 'EMPLOYEE'];

const roleRoutes: Record<
  EstablishmentRole,
  string
> = {
  ADMIN: '/(establishment)/(tabs)/items',
  KITCHEN:
    '/(establishment)/(tabs)/kitchen',
  EMPLOYEE:
    '/(establishment)/(tabs)/tables'
};

const ProfileSwitcher = () => {
  const {
    mode,
    role,
    setMode,
    setRole
  } = useProfile();

  const [expanded, setExpanded] =
    useState(false);

  const handleChangeMode = (
  newMode: AppMode
) => {
  setMode(newMode);
  setExpanded(false);

  if (newMode === 'CLIENT') {
    router.replace(
      '/(client)/(tabs)'
    );

    return;
  }

  router.replace(
    roleRoutes[role] as never
  );
};

  const handleChangeRole = (
    newRole: EstablishmentRole
  ) => {
    setRole(newRole);
    setExpanded(false);
    router.replace(
      roleRoutes[newRole] as never
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.summary}
        onPress={() =>
          setExpanded(
            current => !current
          )
        }
      >
        <View>
          <Text style={styles.label}>
            Perfil activo
          </Text>

          <Text style={styles.title}>
            {mode === 'CLIENT'
              ? 'Cliente'
              : `Establecimiento - ${role}`}
          </Text>
        </View>

        <Text style={styles.toggleText}>
          {expanded ? 'Cerrar' : 'Cambiar'}
        </Text>
      </Pressable>

      {expanded && (
        <>
          <View
            style={styles.modeContainer}
          >
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
              style={
                styles.rolesContainer
              }
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
                      handleChangeRole(
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
        </>
      )}
    </View>
  );
};

export default ProfileSwitcher;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12
  },

  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    gap: 12
  },

  label: {
    color: '#C7C7CC',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  toggleText: {
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },

  roleButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: 110,
    alignItems: 'center'
  },

  activeRole: {
    backgroundColor: '#34C759'
  },

  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
