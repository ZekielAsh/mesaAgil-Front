import { RevenuePointResponse } from '@/types/StatsResponses';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type Props = {
  data: RevenuePointResponse[];
};

export default function RevenueChart({
  data
}: Props) {
  const screenWidth = Dimensions.get('window').width;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Evolución de ingresos
      </Text>

      <LineChart
        data={{
          labels: data.map(item => item.label),
          datasets: [
            {
              data: data.map(item => item.revenue)
            }
          ]
        }}
        width={screenWidth - 64}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',

  decimalPlaces: 0,

  color: (opacity = 1) =>
    `rgba(33, 150, 243, ${opacity})`,

  labelColor: (opacity = 1) =>
    `rgba(0, 0, 0, ${opacity})`,

  propsForLabels: {
    fontSize: 12
  },

  propsForDots: {
    r: '5'
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },

  chart: {
    borderRadius: 12
  },

  singleValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#2196F3'
  }
});