import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

type ChartItem = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  data: ChartItem[];
  isCurrency?: boolean;
};


function formatValue(value: number, isCurrency: boolean) {
  const formatted = new Intl.NumberFormat('es-AR').format(value);

  return isCurrency
    ? `$${formatted}`
    : formatted;
}

export default function RankingBarChart({ title, data, isCurrency }: Props) {
  const [showAll, setShowAll] = useState(false);

  if (data.length === 0) {
    return null;
  }

  const sortedData = [...data].sort(
    (a, b) => b.value - a.value
  );

  const visibleData = showAll
        ? sortedData
        : sortedData.slice(0, 5);

  const shouldShowToggle = sortedData.length > 5;

  const maxValue = Math.max(
    ...visibleData.map(
      item => item.value
    ),
    1
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {visibleData.map((item, index) => {
        const percentage =
          (item.value / maxValue) * 100;

        return (
          <View
            key={`${item.label}-${index}`}
            style={styles.item}
          >
            <View style={styles.header}>
              <Text style={styles.rank}>
                #{index + 1}
              </Text>

              <Text
                style={styles.label}
                numberOfLines={1}
              >
                {item.label}
              </Text>

              <Text style={styles.value}>
                {formatValue(
                  item.value,
                  isCurrency || false
                )}
              </Text>
            </View>

            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  {
                    width: `${percentage}%`
                  }
                ]}
              />
            </View>
          </View>
        );
      })}

      {shouldShowToggle && (
        <Pressable
          onPress={() => setShowAll(prev => !prev)}
          style={({ hovered, pressed }) => [
            styles.toggle,
            hovered && styles.toggleHover,
            pressed && styles.togglePressed,
          ]}
        >
          <Text style={styles.toggleText}>
            {showAll
              ? 'Ver menos'
              : 'Ver ranking completo'}
          </Text>
        </Pressable>
      )}
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
    marginBottom: 16
  },

  item: {
    marginBottom: 18
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },

  rank: {
    width: 30,
    fontWeight: '700',
    color: '#555'
  },

  label: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    marginRight: 8
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20'
  },

  track: {
    height: 14,
    backgroundColor: '#E8E8E8',
    borderRadius: 7,
    overflow: 'hidden'
  },

  fill: {
    height: '100%',
    backgroundColor: '#1B5E20',
    borderRadius: 7
  },

  toggle: {
    marginTop: 8,
    alignSelf: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    transitionDuration: '150ms' as any,
  },

  toggleHover: {
    backgroundColor: '#2563EB',
  },

  togglePressed: {
    opacity: 0.9,
  },

  toggleText: {
    color: '#FFF',
    fontWeight: '600'
  }
});