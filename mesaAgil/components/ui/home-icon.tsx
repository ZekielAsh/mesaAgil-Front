import Foundation from '@expo/vector-icons/MaterialIcons';

// TODO: ver en IOS
export default function HomeIcon({ color = 'black' }: { color: string }) {
  return <Foundation name="home" size={24} color={color} />;
}
