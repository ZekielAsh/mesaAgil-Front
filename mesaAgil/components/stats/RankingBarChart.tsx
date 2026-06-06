import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { BarChart } from 'react-native-chart-kit';

type ChartItem = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  data: ChartItem[];
};

export default function RankingBarChart({
  title,
  data
}: Props) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <BarChart
        data={{
          labels: data.map(item =>
            item.label.replace('Mesa ', '')
          ),
          datasets: [
            {
              data: data.map(item => item.value)
            }
          ]
        }}
        width={screenWidth - 64}
        height={220}
        fromZero
        showValuesOnTopOfBars
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
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
    `rgba(27, 94, 32, ${opacity})`,

  labelColor: (opacity = 1) =>
    `rgba(0, 0, 0, ${opacity})`,

  propsForLabels: {
    fontSize: 12
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
  }
});