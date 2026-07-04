import CategoryPieChart from '@/components/stats/CategoryPieChart';
import RankingBarChart from '@/components/stats/RankingBarChart';
import RevenueChart from '@/components/stats/RevenueChart';
import SummaryCards from '@/components/stats/SummaryCards';
import PeriodSelector from '@/components/stats/PeriodSelector';
import { Period } from '@/types/StatsResponses';
import ChartSection from '@/components/stats/ChartSection';

import { useCategoryRevenue } from '@/hooks/stats/useCategoryRevenue';
import { useRevenueTimeline } from '@/hooks/stats/useRevenueTimeline';
import { useStatsByPeriod } from '@/hooks/stats/useStatsByPeriod';
import { useTableOrders } from '@/hooks/stats/useTableOrders';
import { useTableRevenue } from '@/hooks/stats/useTableRevenue';
import { useTopProducts } from '@/hooks/stats/useTopProducts';
import { useTopRevenueProducts } from '@/hooks/stats/useTopRevenueProducts';

import { useEffect, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Stats() {
  const [period, setPeriod] = useState<Period>('LAST_MONTH');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [currentChartTitle, setCurrentChartTitle] = useState('Datos de negocio');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [sections, setSections] = useState<
    { id: string;
      title: string;
      y: number; }[]> ([]);
  const { stats, isLoadingStats, statsErrorMessage } = useStatsByPeriod(period);

  const revenueTimeline = useRevenueTimeline(period);
  const categories = useCategoryRevenue(period);
  const topProducts = useTopProducts(period);
  const topRevenueProducts = useTopRevenueProducts(period);
  const tableOrders = useTableOrders(period);
  const tableRevenue = useTableRevenue(period);

  const insets = useSafeAreaInsets();
  const isLoading = isLoadingStats ||
    revenueTimeline.loading ||
    categories.loading ||
    tableOrders.loading ||
    tableRevenue.loading ||
    topProducts.loading ||
    topRevenueProducts.loading;

  useEffect(() => {
    if (!isLoading && !hasLoadedOnce) { setHasLoadedOnce(true); }
  }, [isLoading, hasLoadedOnce]);

  const isInitialLoading = !hasLoadedOnce && isLoading;
  const isRefreshing = hasLoadedOnce && isLoading;
  const errorMessage = statsErrorMessage ||
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
    },
    {
      text: 'DEL ÚLTIMO AÑO',
      label: 'Año',
      value: 'LAST_YEAR'
    }
  ] as const;

  const selectedPeriodText = periods.find(p => p.value === period)?.text ?? '';

  const registerSection = (id: string, title: string, y: number) => {
    setSections(previous => {
      const filtered = previous.filter(
        section => section.id !== id
      );

      return [...filtered, { id, title, y }]
        .sort((a, b) => a.y - b.y);
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const triggerPoint = event.nativeEvent.contentOffset.y + headerHeight;

    let activeTitle = sections[0]?.title ?? '';

    for (const section of sections) {
      if (section.y <= triggerPoint) {
        activeTitle = section.title;
      } else {
        break; 
      }
    }

    if (activeTitle && activeTitle !== currentChartTitle) {
      setCurrentChartTitle(activeTitle);
    }
  };
  

  if (isInitialLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
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
        <Text>
          No hay estadísticas disponibles.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {isRefreshing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <View
        onLayout={(event) =>
          setHeaderHeight(event.nativeEvent.layout.height)
        }
        style={[
          styles.stickyHeader,
          { paddingTop: insets.top }
        ]}
      >
        <View style={styles.headerTopRow}>
          <Text style={styles.title}>
            {`ESTADÍSTICAS ${selectedPeriodText}`}
          </Text>

          <PeriodSelector
            period={period}
            periods={periods}
            onChange={setPeriod}
          />
        </View>

        <Text style={styles.currentChart}>
          {currentChartTitle}
        </Text>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.container}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom
        }}
      >
        <ChartSection
          id="cards"
          title="Datos de negocio"
          onLayout={registerSection}
        >
          <SummaryCards
            stats={stats}
          />
        </ChartSection>

        <ChartSection
          id="revenue"
          title="Evolución de ingresos"
          onLayout={registerSection}
        >
          <RevenueChart
            data={revenueTimeline.data}
          />
        </ChartSection>

        <ChartSection
          id="topProducts"
          title="Comidas más vendidas"
          onLayout={registerSection}
        >
          <RankingBarChart
            title="Comidas más vendidas"
            data={topProducts.data.map(
              item => ({
                label: item.name,
                value: item.total
              })
            )}
          />
        </ChartSection>

        <ChartSection
          id="topRevenueProducts"
          title="Comidas con mayor facturación"
          onLayout={registerSection}
        >
          <RankingBarChart
            title="Comidas con mayor facturación"
            data={topRevenueProducts.data.map(
              item => ({ 
                label: item.name, 
                value: item.totalRevenue })
            )}
            isCurrency
          />
        </ChartSection>

        <ChartSection
          id="categories"
          title="Participación por categoría"
          onLayout={registerSection}
        >
          <CategoryPieChart
            key={period}
            data={ categories.data }
          />
        </ChartSection>

        <ChartSection
          id="tables"
          title="Mesas más usadas"
          onLayout={registerSection}
        >
          <RankingBarChart
            title="Mesas más usadas"
            data={tableOrders.data.map(
              item => ({ 
                label: `Mesa ${item.tableNumber}`, 
                value: item.totalOrders })
            )}
          />
        </ChartSection>

        <ChartSection
          id="tableRevenue"
          title="Ingresos por mesa"
          onLayout={registerSection}
        >
          <RankingBarChart
            title="Ingresos por mesa"
            data={tableRevenue.data.map(
              item => ({
                label: `Mesa ${item.tableNumber}`,
                value: item.revenue
              })
            )}
            isCurrency
          />
        </ChartSection>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },

  container: {
    flex: 1,
    backgroundColor: '#EFEFEF'
  },

  title: {
    fontSize: 12,
    color: '#888'
  },

  header: {
    marginBottom: 8
  },

  currentChart: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginTop: 6
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  stickyHeader: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingBottom: 12
  },

  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'rgba(255,255,255,0.5)',
    zIndex: 100
  }
});