import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const TableScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Table screen coming soon
      </Text>
    </View>
  );
};

export default TableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});