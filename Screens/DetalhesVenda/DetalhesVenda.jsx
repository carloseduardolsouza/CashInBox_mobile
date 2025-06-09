import services from "../../services/services";
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
import { useTheme } from "../../Context/Provider";

const CardItemDetalhesVenda = ({dados}) => {
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.cardItemDetalhesVenda,
        { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
      ]}
    >
      <Text style={[styles.cardText, { color: isDarkMode ? "#fff" : "#333" }]}>
        {dados.quantidade}x
      </Text>
      <Text style={[styles.cardText, { color: isDarkMode ? "#fff" : "#333" }]}>
        {dados.produto_nome}
      </Text>
      <Text style={[styles.cardText, { color: isDarkMode ? "#fff" : "#333" }]}>
        {services.formatarCurrency(dados.valor_total)}
      </Text>
    </View>
  );
};

function DetalhesVenda({route}) {
  const { dados , produtos } = route.params;

  const { isDarkMode } = useTheme();

  const handleGerarPDF = () => console.log("Gerar PDF clicado");
  const handleCancelarVenda = () => console.log("Cancelar Venda clicado");
  const handleCompartilhar = () => console.log("Compartilhar clicado");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.valor, { color: isDarkMode ? "#fff" : "#333" }]}>
            {services.formatarCurrency(dados.valor_total)}
          </Text>
          <FontAwesome name="money" size={40} color="#4CAF50" />
        </View>

        <Text
          style={[styles.numeroVenda, { color: isDarkMode ? "gray" : "#333" }]}
        >
          Venda Nº {dados.id} DESKTOP
        </Text>

        <View style={styles.infoLinha}>
          <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#444" }]}>
            Data
          </Text>
          <Text
            style={[styles.infoText, { color: isDarkMode ? "#fff" : "#666" }]}
          >
            {services.formatarDataCurta(dados.data_venda)} - 
            {services.formatarHorario(dados.data_venda)}
          </Text>
        </View>

        <View style={styles.infoLinha}>
          <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#444" }]}>
            Vendedor
          </Text>
          <Text
            style={[styles.infoText, { color: isDarkMode ? "#fff" : "#666" }]}
          >
            {dados.nome_funcionario}
          </Text>
        </View>

        <View style={styles.itensSection}>
          <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#444" }]}>
            Itens
          </Text>
          <Text
            style={[
              styles.infoQuantidade,
              { color: isDarkMode ? "#fff" : "#777" },
            ]}
          >
            Quantidade: {produtos.length}
          </Text>

          {produtos.map((dados) => (
            <CardItemDetalhesVenda dados={dados} />
          ))}
        </View>

        <View
          style={[
            styles.pagamento,
            { borderTopColor: isDarkMode ? "#333" : "#eee" },
          ]}
        >
          <Text
            style={[
              styles.pagamentoText,
              { color: isDarkMode ? "#fff" : "#555" },
            ]}
          >
            Desconto: {dados.descontos}
          </Text>
          <Text
            style={[
              styles.pagamentoText,
              { color: isDarkMode ? "#fff" : "#555" },
            ]}
          >
            Acréscimos: {dados.acrescimos}
          </Text>
          <Text
            style={[styles.totalText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Total: {services.formatarCurrency(dados.valor_total)}
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: isDarkMode ? "#121212" : "#fff",
            borderTopColor: isDarkMode ? "#333" : "#eee",
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.cancelarVendaButton, { borderColor: "#f44336" }]}
          onPress={handleCancelarVenda}
        >
          <Text style={[styles.cancelarVendaText, { color: "#f44336" }]}>
            Cancelar Venda
          </Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            onPress={handleCompartilhar}
          >
            <Text
              style={[
                styles.buttonText,
                { color: isDarkMode ? "#333" : "#fff" },
              ]}
            >
              Compartilhar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.pdfButton]}
            onPress={handleGerarPDF}
          >
            <Text
              style={[
                styles.buttonText,
                { color: isDarkMode ? "#333" : "#fff" },
              ]}
            >
              Gerar PDF
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DetalhesVenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  scrollContainer: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  valor: {
    fontSize: 32,
    fontWeight: "bold",
  },
  numeroVenda: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  infoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
  },
  infoText: {
    fontSize: 14,
  },
  itensSection: {
    marginTop: 20,
    paddingTop: 10,
  },
  infoQuantidade: {
    marginBottom: 10,
    fontSize: 13,
  },
  cardItemDetalhesVenda: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
  },
  cardText: {
    fontSize: 14,
  },
  pagamento: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    marginBottom: 150,
  },
  pagamentoText: {
    marginBottom: 6,
    fontSize: 13,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: "#4CAF50",
  },
  pdfButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  cancelarVendaButton: {
    padding: 15,
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelarVendaText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
