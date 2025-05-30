import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CashInBox</Text>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // No Android ajusta pela altura da StatusBar, no iOS SafeAreaView já resolve.
    paddingHorizontal: 16, // opcional, pra dar um respiro lateral
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
