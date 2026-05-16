import Feather from '@expo/vector-icons/Feather';

export default function TrashIcon({ color = 'black' }: { color: string }) {
  return <Feather name="trash-2" size={16} color={color} />;
}
