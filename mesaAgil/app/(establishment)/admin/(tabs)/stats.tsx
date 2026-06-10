import CategoryPieChart from '@/components/stats/CategoryPieChart';
import RankingBarChart from '@/components/stats/RankingBarChart';
import RevenueChart from '@/components/stats/RevenueChart';
import SummaryCards from '@/components/stats/SummaryCards';

import { useCategoryRevenue } from '@/hooks/stats/useCategoryRevenue';
import { useRevenueTimeline } from '@/hooks/stats/useRevenueTimeline';
import { useStatsByPeriod } from '@/hooks/stats/useStatsByPeriod';
import { useTableOrders } from '@/hooks/stats/useTableOrders';
import { useTableRevenue } from '@/hooks/stats/useTableRevenue';
import { useTopProducts } from '@/hooks/stats/useTopProducts';
import { useTopRevenueProducts } from '@/hooks/stats/useTopRevenueProducts';

import { Period } from '@/types/StatsResponses';

import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Stats() {
  const [period, setPeriod] = useState<Period>('LAST_MONTH');

  const {
    stats,
    isLoadingStats,
    statsErrorMessage
  } = useStatsByPeriod(period);

  const revenueTimeline =
    useRevenueTimeline(period);

  const categories =
    useCategoryRevenue(period);

  const topProducts =
    useTopProducts(period);

  const topRevenueProducts =
    useTopRevenueProducts(period);

  const tableOrders =
    useTableOrders(period);

  const tableRevenue =
    useTableRevenue(period);

  const insets = useSafeAreaInsets();

  const isLoading =
    isLoadingStats ||
    revenueTimeline.loading ||
    categories.loading ||
    tableOrders.loading ||
    tableRevenue.loading ||
    topProducts.loading ||
    topRevenueProducts.loading;

  const errorMessage =
    statsErrorMessage ||
    revenueTimeline.errorMessage ||
    categories.errorMessage ||
    tableOrders.errorMessage ||
    tableRevenue.errorMessage ||
    topProducts.errorMessage ||
    topRevenueProducts.errorMessage;

  const periods = [
    {
      text: 'DEL ÚLTIMO DÍA',
      label: 'Día',
      value: 'LAST_DAY'
    },
    {
      text: 'DE LA ÚLTIMA SEMANA',
      label: 'Semana',
      value: 'LAST_WEEK'
    },
    {
      text: 'DEL ÚLTIMO MES',
      label: 'Mes',
      value: 'LAST_MONTH'
    }
  ] as const;

  const selectedPeriodText =
    periods.find(
      p => p.value === period
    )?.text ?? '';

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ marginTop: 50 }}
      />
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.center}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.center}>
        <Text>No hay estadísticas disponibles.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom:
            insets.bottom
        }
      ]}
    >
      <View style={styles.tabs}>
        {periods.map(p => (
          <Pressable
            key={p.value}
            onPress={() =>
              setPeriod(
                p.value as Period
              )
            }
            style={[
              styles.tab,
              period === p.value &&
                styles.activeTab
            ]}
          >
            <Text
              style={[
                styles.tabText,
                period === p.value &&
                  styles.activeTabText
              ]}
            >
              {p.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.title}>
        {`ESTADÍSTICAS ${selectedPeriodText}`}
      </Text>

      <SummaryCards
        stats={stats}
      />

      <RevenueChart
        data={
          revenueTimeline.data
        }
      />

      <RankingBarChart
        title="Comidas más vendidas"
        data={topProducts.data.map(
          item => ({
            label: item.name,
            value: item.total
          })
        )}
      />

      <RankingBarChart
        title="Comidas con mayor facturación"
        data={topRevenueProducts.data.map(
          item => ({
            label: item.name,
            value: item.totalRevenue
          })
        )}
      />

      <CategoryPieChart
        data={
          categories.data
        }
      />

      <RankingBarChart
        title="Mesas más usadas"
        data={tableOrders.data.map(
          item => ({
            label: `Mesa ${item.tableNumber}`,
            value:
              item.totalOrders
          })
        )}
      />

      <RankingBarChart
        title="Ingresos por mesa"
        data={tableRevenue.data.map(
          item => ({
            label: `Mesa ${item.tableNumber}`,
            value: item.revenue
          })
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 16
  },

  title: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16
  },

  tabs: {
    flexDirection: 'row',
    marginBottom: 12
  },

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#EEE',
    marginRight: 8
  },

  activeTab: {
    backgroundColor: '#333'
  },

  tabText: {
    fontSize: 12,
    color: '#333'
  },

  activeTabText: {
    color: '#FFF'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});