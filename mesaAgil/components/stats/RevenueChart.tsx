import { RevenuePointResponse } from '@/types/StatsResponses';

import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  LineChart
} from 'react-native-gifted-charts';

type Props = {
  data: RevenuePointResponse[];
};

function formatValue(
  value: number
) {
  return new Intl.NumberFormat(
    'es-AR'
  ).format(value);
}

export default function RevenueChart({
  data
}: Props) {
  const screenWidth =
    Dimensions.get('window').width;

  if (data.length === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Evolución de ingresos
        </Text>

        <Text>
          Ingresos registrados el{' '}
          {data[0].label}
        </Text>

        <Text
          style={styles.singleValue}
        >
          $
          {formatValue(
            data[0].revenue
          )}
        </Text>
      </View>
    );
  }

  const chartData = data.map(
    item => ({
      value: item.revenue,
      label: item.label
    })
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Evolución de ingresos
      </Text>

      <LineChart
        data={chartData}
        width={screenWidth - 80}
        height={220}

        color="#2196F3"
        thickness={3}

        curved

        hideDataPoints={false}

        dataPointsColor="#2196F3"
        dataPointsRadius={5}

        yAxisColor="#CCCCCC"
        xAxisColor="#CCCCCC"

        rulesColor="#E0E0E0"

        noOfSections={4}

        yAxisTextStyle={
          styles.axisLabel
        }

        xAxisLabelTextStyle={
          styles.axisLabel
        }

        showVerticalLines={false}

        focusEnabled

        pointerConfig={{
          pointerStripHeight: 220,
          pointerStripColor:
            '#BDBDBD',

          pointerColor:
            '#2196F3',

          radius: 6,

          activatePointersOnLongPress:
            false,

          pointerLabelComponent:
            (items: any[]) => (
              <View
                style={
                  styles.tooltip
                }
              >
                <Text
                  style={
                    styles.tooltipLabel
                  }
                >
                  {
                    items[0]?.label
                  }
                </Text>

                <Text
                  style={
                    styles.tooltipValue
                  }
                >
                  $
                  {formatValue(
                    items[0]?.value ??
                      0
                  )}
                </Text>
              </View>
            )
        }}
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

  axisLabel: {
    fontSize: 12,
    color: '#666'
  },

  tooltip: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',

    borderWidth: 1,
    borderColor: '#E0E0E0'
  },

  tooltipLabel: {
    fontSize: 12,
    color: '#666'
  },

  tooltipValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2196F3'
  },

  singleValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2196F3',
    marginTop: 8
  }
});