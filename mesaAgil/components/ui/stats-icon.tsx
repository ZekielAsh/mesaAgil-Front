import Ionicons from '@expo/vector-icons/Ionicons';

export default function StatsIcon({ color = 'black' }: { color: string }) {
  return <Ionicons name="stats-chart" size={24} color={color} />;
}
