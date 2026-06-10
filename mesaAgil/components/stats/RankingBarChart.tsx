import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  BarChart
} from 'react-native-gifted-charts';

type ChartItem = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  data: ChartItem[];
};

function calculateMaxValue(
  maxValue: number
) {
  if (maxValue <= 4) {
    return 4;
  }

  const step = Math.ceil(
    maxValue / 4
  );

  return step * 4;
}

function formatValue(
  value: number
) {
  return new Intl.NumberFormat(
    'es-AR'
  ).format(value);
}

export default function RankingBarChart({
  title,
  data
}: Props) {
  const screenWidth =
    Dimensions.get('window').width;

  const maxValue = Math.max(
    ...data.map(item => item.value),
    1
  );

  const chartMax =
    calculateMaxValue(maxValue);

  const chartWidth =
    Math.max(
      screenWidth - 100,
      data.length * 70
    );

  const chartData = data.map(
    item => ({
      value: item.value,
      label: item.label,
      frontColor: '#1B5E20',

      topLabelComponent: () => (
        <Text style={styles.topLabel}>
          {formatValue(item.value)}
        </Text>
      )
    })
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <BarChart
        data={chartData}
        width={chartWidth}
        height={260}
        maxValue={chartMax}
        noOfSections={4}

        yAxisThickness={1}
        xAxisThickness={1}

        spacing={30}
        barWidth={36}

        yAxisTextStyle={
          styles.yAxisLabel
        }

        hideRules={false}

        rulesColor="#E0E0E0"

        showValuesAsTopLabel={false}
      />
    </View>
  );
}

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

  topLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6
  },

  yAxisLabel: {
    fontSize: 12,
    width: 60
  }
});