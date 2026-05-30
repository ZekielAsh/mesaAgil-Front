import { StyleSheet, Text, View } from 'react-native';

export default function WaitingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gracias por visitarnos</Text>
      <Text style={styles.text}>La cuenta fue cerrada.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666'
  }
});
