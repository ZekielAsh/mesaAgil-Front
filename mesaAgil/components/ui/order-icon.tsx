import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// TODO: ver en IOS
export default function OrderIcon({ color = 'black' }: { color: string }) {
  return <MaterialIcons name="list-alt" size={24} color={color} />;
}
