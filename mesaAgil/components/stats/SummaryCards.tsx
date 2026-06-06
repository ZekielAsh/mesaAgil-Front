import { StatsSummaryResponse } from '@/types/StatsResponses';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  stats: StatsSummaryResponse;
};

export default function SummaryCards({ stats }: Props) {
  const cards = [
    {
      title: 'Ingresos',
      value: `$${stats.totalRevenue}`
    },
    {
      title: 'Órdenes',
      value: stats.totalOrders.toString()
    },
    {
      title: 'Ticket Promedio',
      value: `$${stats.avgTicket}`
    },
    {
      title: 'Más vendido',
      value: `${stats.topItemName} (${stats.topItemQuantity})`
    },
    {
      title: 'Mayor ingreso',
      value: `${stats.topRevenueItemName}`
    },
    {
      title: 'Monto generado',
      value: `$${stats.topRevenueItemAmount}`
    }
  ];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.value} numberOfLines={2}>
            {card.value}
          </Text>

          <Text style={styles.title}>
            {card.title}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24
  },

  card: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    minHeight: 90
  },

  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },

  title: {
    marginTop: 8,
    fontSize: 12,
    color: '#666'
  }
});