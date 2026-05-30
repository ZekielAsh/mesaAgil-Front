import { useStatsByPeriod } from '@/hooks/useStatsByPeriod';
import { Period } from '@/types/StatsSummaryResponse';
import { useState } from 'react';
import { ActivityIndicator, Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Stats() {
  const [period, setPeriod] = useState<Period>('LAST_MONTH');
  const { stats, isLoadingStats, statsErrorMessage, refetch } = useStatsByPeriod(period);
  const insets = useSafeAreaInsets();

  const periods: { text: string; label: string; value: Period }[] = [
    { text: 'DEL ÚLTIMO DÍA', label: 'Día', value: 'LAST_DAY' },
    { text: 'DE LA ÚLTIMA SEMANA', label: 'Semana', value: 'LAST_WEEK' },
    { text: 'DEL ÚLTIMO MES', label: 'Mes', value: 'LAST_MONTH' }
  ];

  const selectedPeriodText = periods.find(p => p.value === period)?.text || '';

  if (isLoadingStats) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (statsErrorMessage || stats === undefined) {
    return (
      <View style={styles.center}>
        <Text>{statsErrorMessage}</Text>
        <Button title="Reintentar" onPress={() => refetch(period)} />
      </View>
    );
  }

  const statsList = [
    {
      label: 'Ingresos totales',
      value: `$${stats.totalRevenue}`
    },
    {
      label: 'Órdenes',
      value: stats.totalOrders
    },
    {
      label: 'Ticket promedio',
      value: `$${stats.avgTicket}`
    },
    {
      label: 'Más vendido',
      value: `${stats.topItemName} (${stats.topItemQuantity})`
    },
    {
      label: 'Mayor ingreso',
      value: `${stats.topRevenueItemName} ($${stats.topRevenueItemAmount})`
    }
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        padding: 16,
        backgroundColor: '#fff'
      }}
    >
      <View style={styles.tabs}>
        {periods.map(p => (
          <Pressable
            key={p.value}
            onPress={() => {
              setPeriod(p.value);
              refetch(p.value);
            }}
            style={[styles.tab, period === p.value && styles.activeTab]}
          >
            <Text style={[styles.tabText, period === p.value && styles.activeTabText]}>{p.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.title}>{`ESTADÍSTICAS ${selectedPeriodText}`}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'flex-start' }}
      >
        {stats
          ? statsList.map((stat, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.value}>{stat.value}</Text>
                <Text style={styles.label}>{stat.label}</Text>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center'
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  label: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 5
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
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
    color: '#fff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
