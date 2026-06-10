import {
  StyleSheet,
  Text,
  View
} from 'react-native';

type ChartItem = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  data: ChartItem[];
};

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
  if (data.length === 0) {
    return null;
  }

  const sortedData = [...data].sort(
    (a, b) => b.value - a.value
  );

  const maxValue = Math.max(
    ...sortedData.map(
      item => item.value
    ),
    1
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {sortedData.map(
        (item, index) => {
          const percentage =
            (item.value /
              maxValue) *
            100;

          return (
            <View
              key={`${item.label}-${index}`}
              style={styles.item}
            >
              <View
                style={
                  styles.header
                }
              >
                <Text
                  style={
                    styles.rank
                  }
                >
                  #{index + 1}
                </Text>

                <Text
                  style={
                    styles.label
                  }
                  numberOfLines={1}
                >
                  {item.label}
                </Text>

                <Text
                  style={
                    styles.value
                  }
                >
                  {formatValue(
                    item.value
                  )}
                </Text>
              </View>

              <View
                style={
                  styles.track
                }
              >
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
        }
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
  }
});