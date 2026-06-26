import Ionicons from '@expo/vector-icons/Ionicons';

export default function CloseIcon({ color = 'black' }: { color: string }) {
  return <Ionicons name="close" size={24} color={color} />;
}
