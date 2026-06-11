import { Period } from '@/types/StatsResponses';
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type PeriodOption = {
  text: string;
  label: string;
  value: Period;
};

type Props = {
  period: Period;
  periods: readonly PeriodOption[];
  onChange: (period: Period) => void;
};

export default function PeriodSelector({
  period,
  periods,
  onChange
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {periods.map(p => (
          <Pressable
            key={p.value}
            onPress={() => onChange(p.value)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 8
  },

  tabs: {
    flexDirection: 'row'
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
  }
});