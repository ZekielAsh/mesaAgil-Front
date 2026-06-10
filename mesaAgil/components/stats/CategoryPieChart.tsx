import { CategoryRevenueResponse } from '@/types/StatsResponses';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useMemo, useState } from 'react';

import {
  PieChart
} from 'react-native-gifted-charts';

type Props = {
  data: CategoryRevenueResponse[];
};

type SelectedCategory = {
  category: string;
  revenue: number;
  percentage: number;
  rank: number;
  color: string;
};

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat(
    'es-AR'
  ).format(value);
}

function lightenColor(
    color: string
  ) {
    const num = parseInt(
      color.replace('#', ''),
      16
    );

    const amt = 40;

    const r = Math.min(
      255,
      (num >> 16) + amt
    );

    const g = Math.min(
      255,
      ((num >> 8) & 0x00ff) +
        amt
    );

    const b = Math.min(
      255,
      (num & 0x0000ff) + amt
    );

    return `rgb(${r},${g},${b})`;
  }

export default function CategoryPieChart({
  data
}: Props) {
  const totalRevenue = data.reduce(
    (sum, item) =>
      sum + item.revenue,
    0
  );

  const sortedData = useMemo(
    () =>
      [...data].sort(
        (a, b) =>
          b.revenue - a.revenue
      ),
    [data]
  );

  const colors = [
    '#2196F3',
    '#4CAF50',
    '#FF9800',
    '#9C27B0',
    '#F44336'
  ];

  const getCategoryInfo = (
  category: string
): SelectedCategory => {
  const item = data.find(
    c => c.category === category
  )!;

  const index = data.findIndex(
    c => c.category === category
  );

  const rank =
    sortedData.findIndex(
      c =>
        c.category === category
    ) + 1;

    return {
      category,
      revenue: item.revenue,

      percentage:
        totalRevenue > 0
          ? Number(
              (
                (item.revenue /
                  totalRevenue) *
                100
              ).toFixed(1)
            )
          : 0,

      rank,

      color:
        colors[
          index % colors.length
        ]
    };
  };

  const [selectedItem, setSelectedItem] =
    useState<SelectedCategory | null>(
      data.length > 0
        ? getCategoryInfo(
            sortedData[0].category
          )
        : null
    );

  const chartData = data.map(
    (item, index) => {

      const baseColor =
        colors[
          index % colors.length
        ];

      const isSelected =
        selectedItem?.category ===
        item.category;

      return {
        value: item.revenue,

        color: isSelected
          ? lightenColor(
              baseColor
            )
          : baseColor,

        text: `${(
          (item.revenue /
            totalRevenue) *
          100
        ).toFixed(1)}%`,

        onPress: () =>
          setSelectedItem(
            getCategoryInfo(
              item.category
            )
          )
      };
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Participación por categoría
      </Text>

      <View
        style={
          styles.chartContainer
        }
      >
        <PieChart
          data={chartData}
          donut
          radius={130}
          innerRadius={30}
          showText
          textColor="#111"
          textSize={15}
          fontWeight="700"
        />
      </View>

      <View
        style={
          styles.legendContainer
        }
      >
        {data.map(
          (item, index) => (
            <View
              key={
                item.category
              }
              style={
                styles.legendItem
              }
            >
              <View
                style={[
                  styles.legendColor,
                  {
                    backgroundColor:
                      colors[
                        index %
                          colors.length
                      ]
                  }
                ]}
              />

              <Text
                style={
                  styles.legendText
                }
              >
                {item.category}
              </Text>
            </View>
          )
        )}
      </View>

      {selectedItem && (
        <View style={styles.detailsCard}>

          <View style={styles.headerRow}>
            <View
              style={[
                styles.selectedDot,
                {
                  backgroundColor:
                    selectedItem.color
                }
              ]}
            />

            <Text style={styles.cardTitle}>
              {selectedItem.category}
            </Text>
          </View>

          <View style={styles.metricsRow}>

            <View style={styles.metric}>
              <Text style={styles.metricLabel}>
                Porcentaje
              </Text>

              <Text
                style={
                  styles.percentageValue
                }
              >
                {selectedItem.percentage}%
              </Text>
            </View>

            <View style={styles.metric}>
              <Text style={styles.metricLabel}>
                Ingresos
              </Text>

              <Text
                style={
                  styles.revenueValue
                }
              >
                $
                {formatCurrency(
                  selectedItem.revenue
                )}
              </Text>
            </View>

            <View style={styles.metric}>
              <Text style={styles.metricLabel}>
                Participación
              </Text>

              <Text
                style={styles.rankValue}
              >
                #{selectedItem.rank}
              </Text>
            </View>

          </View>
        </View>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16
    },

    title: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 16
    },

    chartContainer: {
      alignItems: 'center',
      justifyContent:
        'center'
    },

    legendContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:
        'center',
      marginTop: 16,
      gap: 12
    },

    legendItem: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    legendColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 6
    },

    legendText: {
      fontSize: 13,
      color: '#333'
    },

    detailsCard: {
      marginTop: 20,
      padding: 18,
      borderRadius: 16,
      backgroundColor: '#FAFAFA',

      borderWidth: 1,
      borderColor: '#EEEEEE'
    },

    headerRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 18
    },

    selectedDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      marginRight: 10
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#222'
    },

    metricsRow: {
      flexDirection: 'row',
      justifyContent:
        'space-between'
    },

    metric: {
      flex: 1,
      alignItems: 'center'
    },

    metricLabel: {
      fontSize: 12,
      color: '#777',
      marginBottom: 6
    },

    percentageValue: {
      fontSize: 22,
      fontWeight: '700',
      color: '#2196F3'
    },

    revenueValue: {
      fontSize: 22,
      fontWeight: '700',
      color: '#2E7D32'
    },

    rankValue: {
      fontSize: 22,
      fontWeight: '700',
      color: '#222'
    }
  });