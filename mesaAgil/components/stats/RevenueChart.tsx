import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory';

type RevenuePoint = {
  label: string;
  revenue: number;
};

type Props = {
  data: RevenuePoint[];
  loading: boolean;
};

export default function RevenueChart({
  data,
  loading,
}: Props) {
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Evolución de ingresos
      </Text>

      <VictoryChart
        theme={VictoryTheme.material}
      >
        <VictoryAxis />

        <VictoryAxis
          dependentAxis
        />

        <VictoryLine
          data={data}
          x="label"
          y="revenue"
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
});