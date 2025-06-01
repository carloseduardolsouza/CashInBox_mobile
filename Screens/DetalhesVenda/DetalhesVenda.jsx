import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CardItemDetalhesVenda = () => (
  <View style={styles.cardItemDetalhesVenda}>
    <Text>1</Text>
    <Text>Comoda Capri</Text>
    <Text>R$ 200,00</Text>
  </View>
);

function DetalhesVenda() {
  const handleGerarPDF = () => {
    console.log("Gerar PDF clicado");
  };

  const handleCancelarVenda = () => {
    console.log("Cancelar Venda clicado");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>R$ 200,00</Text>
          <Text>Venda N0002 - 10 mai 2025 - 10:40</Text>
        </View>
        <FontAwesome name="money" size={20} color="black" />
      </View>

      <View>
        <View style={styles.infoVendedorCliente}>
          <Text>Vendedor:</Text>
          <Text>Carlos Eduardo</Text>
        </View>

        <View style={styles.infoVendedorCliente}>
          <Text>Cliente:</Text>
          <Text>Julia dos Santos Bahr</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.textQuantidadeScroll}>10 itens</Text>

        {Array.from({ length: 2 }).map((_, index) => (
          <CardItemDetalhesVenda key={index} />
        ))}

        <View style={styles.areaInfoPag}>
          <View style={styles.areasInfoPagamentos}>
            <Text>Acrescimos</Text>
            <Text>R$ 00,00 / 00,00%</Text>
          </View>

          <View style={styles.areasInfoPagamentos}>
            <Text>Descontos</Text>
            <Text>R$ 00,00 / 00,00%</Text>
          </View>

          <View style={styles.areasInfoPagamentos}>
            <Text style={styles.totalInfoPagamento}>Total</Text>
            <Text style={styles.totalInfoPagamento}>R$ 2.544,60</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.fixedButtons}>
        <TouchableOpacity
          style={[styles.button, styles.pdfButton]}
          onPress={handleGerarPDF}
        >
          <Text style={styles.buttonText}>Gerar PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancelarVenda}
        >
          <Text style={styles.buttonText}>Cancelar Venda</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default DetalhesVenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "android" ? 10 : 20,  // Evita excesso no Android
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  infoVendedorCliente: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 5,
  },
  textQuantidadeScroll: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardItemDetalhesVenda: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  areaInfoPag: {
    margin: 15,
    borderTopWidth: 1,
    borderTopColor: "black",
    paddingTop: 10,
  },
  areasInfoPagamentos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalInfoPagamento: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  fixedButtons: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  pdfButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
