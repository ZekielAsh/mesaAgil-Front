import { Fonts } from '@/constants/fonts';
import { UserUpdate } from '@/types/UserUpdate';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type EmployeeCardProps = {
  user: UserUpdate;
  onEdit: (user: UserUpdate) => void;
  onResetPassword: (user: UserUpdate) => void;
  onDelete: () => void;
};

export const EmployeeCard = ({ user, onEdit, onResetPassword, onDelete }: EmployeeCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{user.role}</Text>
        <Text style={styles.name}>{user.username}</Text>
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.editButton} onPress={() => onEdit(user)}>
          <Text style={styles.text}>Editar</Text>
        </Pressable>
        <Pressable style={styles.resetButton} onPress={() => onResetPassword(user)}>
          <Text style={styles.text}>Cambiar contraseña</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => onDelete()}>
          <Text style={styles.text}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  buttons: {
    gap: 6
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 220,
    minHeight: 86,
    justifyContent: 'space-between',
    gap: 10,
    boxShadow: '2px 2px 4px rgba(0,0,0,0.25)'
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  },
  name: {
    color: '#000',
    fontSize: 14
  },
  actions: {
    flexDirection: 'row',
    gap: 8
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f48e00',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#f00000',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Fonts.bold
  }
});
