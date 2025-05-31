import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CardVenda = () => (
  <View style={styles.cardVenda}>
    <View>
      <Text style={styles.valor}>R$ 2.900,00</Text>
      <Text style={styles.cliente}>Cliente: Carlos Eduardo</Text>
    </View>

    <TouchableOpacity
      style={styles.buttonCardVenda}
      onPress={() => console.log("Botão apertado!")}
    >
      <Text style={styles.buttonText}>Detalhes</Text>
    </TouchableOpacity>
  </View>
);

function Vendas() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vendas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Array.from({ length: 30 }).map((_, index) => (
          <CardVenda key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  cardVenda: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  valor: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cliente: {
    fontSize: 14,
    color: "#555",
  },
  buttonCardVenda: {
    backgroundColor: "#0295ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Vendas;
