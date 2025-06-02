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
    <Text>headset</Text>
    <Text>R$ 0,00</Text>
  </View>
);

function DetalhesVenda() {
  const handleGerarPDF = () => {
    console.log("Gerar PDF clicado");
  };

  const handleCancelarVenda = () => {
    console.log("Cancelar Venda clicado");
  };

  const handleCompartilhar = () => {
    console.log("Compartilhar clicado");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.valor}>R$ 0,00</Text>
          <FontAwesome name="money" size={40} color="#90ee90" />
        </View>

        <Text style={styles.numeroVenda}>Venda Nº 0003-1 APP</Text>

        <View style={styles.infoLinha}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.infoText}>2 de Junho de 2025 - 00:21</Text>
        </View>

        <View style={styles.infoLinha}>
          <Text style={styles.label}>Vendedor</Text>
          <Text style={styles.infoText}>Administrador</Text>
        </View>

        <View style={styles.itensSection}>
          <Text style={styles.label}>1 Item</Text>
          <Text style={styles.infoQuantidade}>Quantidade: 1</Text>

          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
          <CardItemDetalhesVenda />
        </View>

        <View style={styles.pagamento}>
          <Text style={styles.pagamentoText}>Desconto: R$ 00,00 / 00,00%</Text>
          <Text style={styles.pagamentoText}>Acrescimos: R$ 00,00 / 00,00%</Text>
          <Text style={styles.totalText}>Total: R$ 0,00</Text>
        </View>
      </ScrollView>

      {/* Botão Cancelar Venda fixo abaixo dos outros dois */}
      <TouchableOpacity
        style={styles.cancelarVendaButton}
        onPress={handleCancelarVenda}
      >
        <Text style={styles.cancelarVendaText}>Cancelar Venda</Text>
      </TouchableOpacity>
      {/* Grupo dos botões Compartilhar e PDF */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={handleCompartilhar}
        >
          <Text style={styles.buttonText}>COMPARTILHAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.pdfButton]}
          onPress={handleGerarPDF}
        >
          <Text style={styles.buttonText}>PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default DetalhesVenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  scrollContainer: {
    paddingBottom: 120, // espaço pros botões fixos
    padding: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  valor: {
    fontSize: 28,
    fontWeight: "bold",
  },
  numeroVenda: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  infoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
  },
  infoText: {
    color: "#333",
  },
  itensSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  infoQuantidade: {
    marginBottom: 10,
    color: "#666",
  },
  cardItemDetalhesVenda: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  pagamento: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  pagamentoText: {
    marginBottom: 5,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: "#2196F3",
  },
  pdfButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelarVendaButton: {
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  cancelarVendaText: {
    color: "#f00",
    fontWeight: "600",
    fontSize: 16,
  },
});
