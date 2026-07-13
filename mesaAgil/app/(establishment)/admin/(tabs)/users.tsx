import CreateUserModal from '@/components/CreateUserModal';
import { EmployeeCard } from '@/components/EmployeeCard';
import ResetPasswordModal from '@/components/ResetPasswordModal';
import EditUserModal from '@/components/ui/EditUserModal';
import { useEmployees } from '@/hooks/useEmployees';
import { useEmployeeActions } from '@/hooks/useEmployeesActions';
import { UserUpdate } from '@/types/UserUpdate';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function UsersScreen() {
  const { employees, error, loading, refresh } = useEmployees();

  const { create, update, remove, resetPassword } = useEmployeeActions(refresh);

  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [selecteduser, setSelectedUser] = useState<UserUpdate>();

  const handleCreateUser = async (username: string, password: string, role: string) => {
    try {
      await create(username, password, role);
      Toast.show({
        type: 'success',
        text1: 'Usuario creado',
        text2: 'El usuario fue creado correctamente'
      });
      setCreateModalVisible(false);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo crear el usuario'
      });
    }
  };

  const handleEditUser = (user: UserUpdate) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleResetPassword = (user: UserUpdate) => {
    setSelectedUser(user);
    setResetPasswordModalVisible(true);
  };

  const handleSubmitResetPassword = async (id: number, password: string) => {
    if (!selecteduser) {
      return;
    }

    try {
      await resetPassword(id, password);
      Toast.show({
        type: 'success',
        text1: 'Contraseña actualizada',
        text2: 'La contraseña fue actualizada correctamente'
      });
      setResetPasswordModalVisible(false);
      setSelectedUser(undefined);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo actualizar la contraseña'
      });
    }
  };

  const handleSubmitEditUser = async (id: number, username: string) => {
    if (!selecteduser) {
      return;
    }

    try {
      await update(id, username);
      Toast.show({
        type: 'success',
        text1: 'Usuario actualizado',
        text2: 'El usuario fue actualizado correctamente'
      });
      setEditModalVisible(false);
      setSelectedUser(undefined);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo actualizar el usuario'
      });
    }
  };

  const handleDeleteEmployee = (id: number) => {
    remove(id);

    Toast.show({
      type: 'success',
      text1: 'Usuario eliminado'
    });
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50
        }}
      />
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>

        <Pressable style={styles.retryButton} onPress={refresh}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Usuarios del establecimiento</Text>
      <Pressable style={styles.createButton} onPress={() => setCreateModalVisible(true)}>
        <Text style={styles.createButtonText}>+ Nuevo usuario</Text>
      </Pressable>
      <FlatList
        horizontal
        data={employees}
        keyExtractor={employee => employee.id.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesListWrapper}
        contentContainerStyle={styles.categoriesList}
        renderItem={({ item }) => (
          <EmployeeCard
            user={item}
            onEdit={handleEditUser}
            onResetPassword={handleResetPassword}
            onDelete={() => handleDeleteEmployee(item.id)}
          />
        )}
      />

      <CreateUserModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreateUser}
      />

      <EditUserModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleSubmitEditUser}
        userId={selecteduser?.id ?? 0}
      />

      <ResetPasswordModal
        visible={resetPasswordModalVisible}
        onClose={() => setResetPasswordModalVisible(false)}
        onSubmit={handleSubmitResetPassword}
        userId={selecteduser?.id ?? 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 10
  },

  categoriesListWrapper: {
    flexGrow: 0,
    minHeight: 98,
    paddingVertical: 8,
    marginBottom: 12
  },

  categoriesList: {
    paddingBottom: 0
  },

  list: {
    gap: 10,
    paddingBottom: 16,
    paddingRight: 4
  },

  itemsList: {
    flex: 1
  },

  createButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10
  },

  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  retryButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    marginTop: 16
  }
});
