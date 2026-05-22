import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function FoodIcon({ color = 'black' }: { color: string }) {
  return <MaterialCommunityIcons name="food" size={24} color={color} />;
}
