import { CategoryRevenueResponse } from '@/types/StatsResponses';

import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { PieChart } from 'react-native-chart-kit';

type Props = {
  data: CategoryRevenueResponse[];
};

export default function CategoryPieChart({
  data
}: Props) {
  const screenWidth = Dimensions.get('window').width;

  const chartData = data.map((item, index) => ({
    name: item.category,
    revenue: item.revenue,
    color: [
      '#2196F3',
      '#4CAF50',
      '#FF9800',
      '#9C27B0',
      '#F44336'
    ][index % 5],
    legendFontColor: '#333',
    legendFontSize: 12
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Participación por categoría
      </Text>

      <PieChart
        data={chartData}
        width={screenWidth - 64}
        height={220}
        accessor="revenue"
        backgroundColor="transparent"
        chartConfig={chartConfig}
        paddingLeft="16"
        absolute
      />
    </View>
  );
}

const chartConfig = {
  color: (opacity = 1) =>
    `rgba(0, 0, 0, ${opacity})`
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
  }
});