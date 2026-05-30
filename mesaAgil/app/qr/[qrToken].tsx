import QrSessionResolver from '@/components/QrSessionResolver';
import { useLocalSearchParams } from 'expo-router';

export default function QrSessionScreen() {
  const { qrToken } = useLocalSearchParams<{ qrToken: string }>();

  return <QrSessionResolver qrToken={qrToken} />;
}
