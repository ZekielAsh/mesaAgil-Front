import { ReactNode } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';

type Props = {
  id: string;
  title: string;
  onLayout: (id: string, title: string, y: number) => void;
  children: ReactNode;
};

export default function ChartSection({
  id,
  title,
  onLayout,
  children
}: Props) {
  const handleLayout = (event: LayoutChangeEvent) => {
    onLayout(id, title, event.nativeEvent.layout.y);
  };

  return (
    <View
      onLayout={handleLayout}
      style={styles.container}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  }
});