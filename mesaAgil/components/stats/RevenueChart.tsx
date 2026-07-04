import { RevenuePointResponse } from '@/types/StatsResponses';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import Svg, { Line, Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

type Props = { data: RevenuePointResponse[]; };

type ChartPoint = RevenuePointResponse & {
  x: number;
  y: number;
  index: number;
};

const CHART_HEIGHT = 220;
const TOP_PADDING = 16;
const BOTTOM_PADDING = 24;
const LEFT_PADDING = 56;
const RIGHT_PADDING = 20;
const GRID_SECTIONS = 4;
const POINT_SIZE = 14;
const TOOLTIP_WIDTH = 120;
const X_LABEL_WIDTH = 36;

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR').format(value);
}

function buildSmoothPath(points: ChartPoint[]) {
  if (points.length === 0) {
    return '';
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
}

export default function RevenueChart({ data, }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { width } = useWindowDimensions();

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
          ${formatCurrency(data[0].revenue)}
        </Text>
      </View>
    );
  }
  
  const chartWidth = width - 64;
  const graphWidth = chartWidth - LEFT_PADDING - RIGHT_PADDING;
  const graphHeight = CHART_HEIGHT - TOP_PADDING - BOTTOM_PADDING;
  const maxRevenue = Math.max( ...data.map(item => item.revenue), 1);

  const gridLines = Array.from({ length: GRID_SECTIONS + 1, }).map((_, index) => {
    const y = TOP_PADDING + (graphHeight / GRID_SECTIONS) * index;

    return { y,
      value: Math.round(maxRevenue - (maxRevenue / GRID_SECTIONS) * index) };
  });

  const points: ChartPoint[] = data.map((item, index) => {
    const x = LEFT_PADDING + (graphWidth / (data.length - 1)) * index;
    const y = TOP_PADDING + graphHeight - (item.revenue / maxRevenue) * graphHeight;
    return { ...item, index, x, y, };
  });

  const linePath = buildSmoothPath(points);
  const fillPath = linePath +
    ` L ${points[points.length-1].x} ${TOP_PADDING+graphHeight}
      L ${points[0].x} ${TOP_PADDING+graphHeight}
      Z`;
  const selectedPoint = selectedIndex !== null
      ? points[selectedIndex]
      : null;

  const isYearView = data.length <= 12;

  const visibleLabels = points.filter((_, index) => {
    if (isYearView) { return true; }
    if (points.length <= 7) { return true; }
    if (index === 0 || index === points.length - 1) { return true; }

    return index % 5 === 0;
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Evolución de ingresos
      </Text>

      <View style={styles.chartContainer}>
        {/* Etiquetas eje Y */}
        {gridLines.map((line, index) => {
          const isMax = index === 0;

          return (
            <Text key={`label-${index}`}
              style={[ styles.yAxisLabel, isMax && styles.maxYAxisLabel,
                { top: line.y - 8 },
              ]}>
              {formatCurrency(line.value)}
            </Text>
          );
        })}

        {/* SVG */}
        <Svg
          width={chartWidth}
          height={CHART_HEIGHT}
        >
          <Defs>
            <LinearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
              <Stop
                  offset="0%"
                  stopColor="#2196F3"
                  stopOpacity="0.35"
              />
              <Stop
                  offset="100%"
                  stopColor="#2196F3"
                  stopOpacity="0"
              />
            </LinearGradient>
          </Defs>
          {/* Grilla */}
          {gridLines.slice(0, -1).map((line, index) => (
            <Line
              key={`grid-${index}`}
              x1={LEFT_PADDING}
              y1={line.y}
              x2={chartWidth - RIGHT_PADDING}
              y2={line.y}
              stroke="#E5E5E5"
              strokeDasharray="4 4"
            />
          ))}

          {/* eje izquierdo */}
          <Line
            x1={LEFT_PADDING}
            y1={TOP_PADDING}
            x2={LEFT_PADDING}
            y2={TOP_PADDING + graphHeight}
            stroke="#CFCFCF"
          />

          {/* eje inferior */}
          <Line
            x1={LEFT_PADDING}
            y1={TOP_PADDING + graphHeight}
            x2={chartWidth - RIGHT_PADDING}
            y2={TOP_PADDING + graphHeight}
            stroke="#CFCFCF"
          />

          {visibleLabels.map(point=>(
            <Line
              key={`v-${point.index}`}
              x1={point.x}
              x2={point.x}
              y1={TOP_PADDING}
              y2={TOP_PADDING+graphHeight}
              stroke="#F2F2F2"
            />
          ))}

          <Path
            d={fillPath}
            fill="url(#revenueGradient)"
          />
          {/* curva */}
          <Path
              d={linePath}
              stroke="#2196F3"
              strokeWidth={3}
              fill="none"
          />
        </Svg>

        {/* Nodos */}
        {points.map(point => {
          const selected = selectedIndex === point.index;
          return (
            <Pressable
              key={point.label}
              onPress={() => setSelectedIndex(selected
                ? null
                : point.index)
              }
              style={[
                styles.pointTouchArea,
                { left: point.x - POINT_SIZE, top: point.y - POINT_SIZE },
              ]}>
              <View style={styles.pointWrapper}>
                {selected && (
                    <View style={styles.pointHalo}/>
                )}
                <View style={[styles.point, selected && styles.selectedPoint]}/>
              </View>
            </Pressable>
          );
        })}
        {/* Tooltip */}
        {selectedPoint && (
          <View
            style={[styles.tooltip,
              { left: Math.min(Math.max(
                  selectedPoint.x - TOOLTIP_WIDTH / 2, LEFT_PADDING), 
                  chartWidth - TOOLTIP_WIDTH),
                top: selectedPoint.y - 62 },
            ]}
          >

            <Text style={ styles.tooltipDate }>
              {selectedPoint.label}
            </Text>

            <Text style={ styles.tooltipRevenue }>
              $ {formatCurrency(selectedPoint.revenue)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.xAxisLabels}>
        {visibleLabels.map(point => (
          <Text key={point.index}
            style={[styles.xAxisLabel, { left: point.x - X_LABEL_WIDTH / 2 }]}>
              {point.label}
          </Text>
          ))}
      </View>
    </View>
  );
};

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
    marginBottom: 16,
  },

  emptyText: {
    color: '#777',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
  },

  singleValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2196F3',
    marginTop: 8,
  },

  chartContainer: {
    position: 'relative',
    height: CHART_HEIGHT,
    marginBottom: 12,
  },

  yAxisLabel: {
    position: 'absolute',
    left: 0,
    width: LEFT_PADDING - 8,
    textAlign: 'right',
    fontSize: 11,
    color: '#666',
  },

  xAxisLabels: {
    position: 'relative',
    height: 18,
    marginTop: -20,
  },

  xAxisLabel: {
    position: 'absolute',
    width: X_LABEL_WIDTH,
    textAlign: 'center',
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },

  pointTouchArea: {
    position: 'absolute',
    width: POINT_SIZE * 2,
    height: POINT_SIZE * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  maxYAxisLabel: {
    color: '#2196F3',
    fontWeight: '700',
  },

  point: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  selectedPoint: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1565C0',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  tooltip: {
    position: 'absolute',
    width: 110,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },

  tooltipDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },

  tooltipRevenue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2196F3',
  },

  pointWrapper:{
    justifyContent:'center',
    alignItems:'center'
  },

  pointHalo:{
    position:'absolute',
    width:28,
    height:28,
    borderRadius:14,
    backgroundColor:'rgba(33,150,243,0.18)'
  },

  dateRange: {
    marginLeft: LEFT_PADDING,
    marginRight: RIGHT_PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});