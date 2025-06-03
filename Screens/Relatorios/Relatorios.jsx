import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/Feather";

// Importa o hook do seu contexto de tema
import { useTheme } from "../../Context/Provider";

const { width: screenWidth } = Dimensions.get("window");

function Relatorios() {
  const [periodo, setPeriodo] = useState("mensal");
  const { isDarkMode } = useTheme();

  const dadosResumo = {
    vendas: 12500.45,
    despesas: 3200.75,
    lucro: 9300.7,
    clientes: 150,
  };

  const dadosGraficoLinha = {
    labels:
      periodo === "diário"
        ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
        : periodo === "mensal"
        ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"]
        : ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        data:
          periodo === "diário"
            ? [500, 700, 400, 800, 600, 900, 750]
            : periodo === "mensal"
            ? [2000, 2500, 2200, 2700, 3000, 3500, 3200]
            : [15000, 18000, 22000, 26000],
        color: (opacity = 1) => `rgba(2, 149, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const dadosGraficoPizza = [
    { name: "Produto A", population: 45, color: "#0295ff", legendFontColor: "#333", legendFontSize: RFValue(12) },
    { name: "Produto B", population: 30, color: "#4FB9FF", legendFontColor: "#333", legendFontSize: RFValue(12) },
    { name: "Produto C", population: 15, color: "#8CD3FF", legendFontColor: "#333", legendFontSize: RFValue(12) },
    { name: "Outros", population: 10, color: "#CCE9FF", legendFontColor: "#333", legendFontSize: RFValue(12) },
  ];

  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? "#2F2F2F" : "#fff",
    backgroundGradientTo: isDarkMode ? "#2F2F2F" : "#fff",
    color: (opacity = 1) => `rgba(2, 149, 255, ${opacity})`,
    labelColor: () => isDarkMode ? "#fff" : "#333",
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>
          <Icon name="bar-chart-2" size={RFValue(24)} color="#0295ff" /> Relatórios
        </Text>

        <View style={styles.filtros}>
          {["diário", "mensal", "anual"].map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriodo(p)}
              style={[styles.botaoFiltro, periodo === p && styles.botaoFiltroAtivo]}
            >
              <Text style={[styles.textoBotaoFiltro, periodo === p && styles.textoBotaoFiltroAtivo]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.resumoContainer}>
          {Object.entries(dadosResumo).map(([chave, valor]) => (
            <View
              key={chave}
              style={[
                styles.cardResumo,
                { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
              ]}
            >
              <Icon name={icones[chave]} size={RFValue(20)} color="#0295ff" />
              <Text style={[styles.cardTitulo, { color: isDarkMode ? "white" : "#333" }]}>
                {capitalize(chave)}
              </Text>
              <Text style={[styles.cardValor, { color: isDarkMode ? "gray" : "#333" }]}>
                {chave === "clientes" ? valor : `R$ ${valor.toFixed(2)}`}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.secaoTitulo, { color: isDarkMode ? "#fff" : "#000" }]}>Vendas no período</Text>

        <LineChart
          data={dadosGraficoLinha}
          width={screenWidth - RFValue(32)}
          height={RFValue(220)}
          chartConfig={chartConfig}
          bezier
          fromZero
          style={[
            styles.grafico,
            { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
          ]}
        />

        <Text style={[styles.secaoTitulo, { color: isDarkMode ? "#fff" : "#000" }]}>Produtos mais vendidos</Text>

        <PieChart
          data={dadosGraficoPizza}
          width={screenWidth - RFValue(32)}
          height={RFValue(220)}
          chartConfig={chartConfig}
          backgroundColor={isDarkMode ? "#2F2F2F" : "#f9f9f9"}
          accessor="population"
          paddingLeft="15"
          absolute
          style={styles.grafico}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const icones = {
  vendas: "shopping-cart",
  despesas: "credit-card",
  lucro: "dollar-sign",
  clientes: "users",
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: RFValue(16),
    alignItems: "center",
  },
  titulo: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    marginBottom: RFValue(24),
    color: "#0295ff",
  },
  filtros: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: RFValue(24),
  },
  botaoFiltro: {
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(20),
    borderWidth: 1,
    borderColor: "#0295ff",
    backgroundColor: "#fff",
  },
  botaoFiltroAtivo: {
    backgroundColor: "#0295ff",
  },
  textoBotaoFiltro: {
    color: "#0295ff",
    fontWeight: "700",
    fontSize: RFValue(14),
  },
  textoBotaoFiltroAtivo: {
    color: "#fff",
  },
  resumoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: RFValue(24),
  },
  cardResumo: {
    width: "48%",
    padding: RFValue(12),
    marginBottom: RFValue(12),
    borderRadius: RFValue(12),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    alignItems: "center",
  },
  cardTitulo: {
    fontSize: RFValue(14),
    fontWeight: "600",
    marginTop: RFValue(8),
  },
  cardValor: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginTop: RFValue(4),
  },
  grafico: {
    borderRadius: RFValue(12),
    padding: RFValue(8),
    marginVertical: RFValue(8),
  },
  secaoTitulo: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    marginTop: RFValue(16),
  },
});

export default Relatorios;
