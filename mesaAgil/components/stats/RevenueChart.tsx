import { RevenuePointResponse } from '@/types/StatsResponses';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type Props = {
  data: RevenuePointResponse[];
};

function formatValue(value: number) {
  return new Intl.NumberFormat('es-AR').format(value);
}

export default function RevenueChart({ data }: Props) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 90;

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Evolución de ingresos
        </Text>

        <Text style={styles.emptyText}>
          No hay información suficiente para generar este gráfico.
        </Text>
      </View>
    );
  }

  if (data.length === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Evolución de ingresos
        </Text>

        <Text>
          Ingresos registrados el {data[0].label}
        </Text>

        <Text style={styles.singleValue}>
          ${formatValue(data[0].revenue)}
        </Text>
      </View>
    );
  }

  const chartData = data.map(item => ({
    value: item.revenue,
    label: item.label,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Evolución de ingresos
      </Text>

      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={chartWidth}

          disableScroll

          initialSpacing={30}
          endSpacing={45}

          xAxisLabelTexts={data.map(() => '')}
          yAxisLabelWidth={45}

          color="#2196F3"
          thickness={3}

          curved

          hideDataPoints={false}
          scrollToEnd={false}

          dataPointsColor="#2196F3"
          dataPointsRadius={5}

          yAxisColor="#CCCCCC"
          xAxisColor="#CCCCCC"

          rulesColor="#E0E0E0"

          noOfSections={4}

          yAxisTextStyle={styles.axisLabel}
          xAxisLabelTextStyle={styles.axisLabel}

          showVerticalLines={false}

          focusEnabled

          pointerConfig={{
            pointerStripHeight: 190,
            pointerStripColor: '#bdbdbd07',

            pointerColor: '#2196F3',
            radius: 0,

            activatePointersOnLongPress: false,

            autoAdjustPointerLabelPosition: true,

            pointerLabelWidth: 100,
            pointerLabelHeight: 50,

            shiftPointerLabelY: -8,

            pointerLabelComponent: (items: any[]) => (
              <View
                style={[
                  styles.tooltip,
                  {
                    marginLeft: -90,
                  },
                ]}
              >
                <Text style={styles.tooltipLabel}>
                  {items[0]?.label}
                </Text>

                <Text style={styles.tooltipValue}>
                  ${formatValue(items[0]?.value ?? 0)}
                </Text>
              </View>
            ),
          }}
        />
      </View>

      <View style={styles.dateRange}>
        <Text style={styles.dateText}>
          {data[0].label}
        </Text>

        <Text style={styles.dateText}>
          {data[data.length - 1].label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  emptyText: {
    color: '#777',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
  },

  axisLabel: {
    fontSize: 12,
    color: '#666',
  },

  tooltip: {
    minWidth: 110,
    maxWidth: 130,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    elevation: 4,
  },

  tooltipLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },

  tooltipValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2196F3',
    textAlign: 'center',
  },

  singleValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2196F3',
    marginTop: 8,
  },

  chartWrapper: {
    overflow: 'hidden',
    marginHorizontal: -4,
  },

  dateRange: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  dateText: {
    marginLeft: 45,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});