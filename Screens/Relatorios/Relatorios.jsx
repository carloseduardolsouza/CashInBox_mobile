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

const screenWidth = Dimensions.get("window").width;

function Relatorios() {
  const [periodo, setPeriodo] = useState("mensal");

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
        color: (opacity = 1) => `rgba(2, 149, 255, ${opacity})`,  // Azul principal
        strokeWidth: 3,
      },
    ],
  };

  const dadosGraficoPizza = [
    {
      name: "Produto A",
      population: 45,
      color: "#0295ff",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Produto B",
      population: 30,
      color: "#4FB9FF",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Produto C",
      population: 15,
      color: "#8CD3FF",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Outros",
      population: 10,
      color: "#CCE9FF",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Relatórios</Text>

        <View style={styles.filtros}>
          {["diário", "mensal", "anual"].map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriodo(p)}
              style={[
                styles.botaoFiltro,
                periodo === p && styles.botaoFiltroAtivo,
              ]}
            >
              <Text
                style={[
                  styles.textoBotaoFiltro,
                  periodo === p && styles.textoBotaoFiltroAtivo,
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.resumoContainer}>
          <View style={styles.cardResumo}>
            <Text style={styles.cardTitulo}>Vendas</Text>
            <Text style={styles.cardValor}>
              R$ {dadosResumo.vendas.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardResumo}>
            <Text style={styles.cardTitulo}>Despesas</Text>
            <Text style={styles.cardValor}>
              R$ {dadosResumo.despesas.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardResumo}>
            <Text style={styles.cardTitulo}>Lucro</Text>
            <Text style={styles.cardValor}>
              R$ {dadosResumo.lucro.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardResumo}>
            <Text style={styles.cardTitulo}>Clientes</Text>
            <Text style={styles.cardValor}>{dadosResumo.clientes}</Text>
          </View>
        </View>

        <Text style={styles.secaoTitulo}>Vendas no período</Text>
        <LineChart
          data={dadosGraficoLinha}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          fromZero
          style={styles.grafico}
        />

        <Text style={styles.secaoTitulo}>Produtos mais vendidos</Text>
        <PieChart
          data={dadosGraficoPizza}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.grafico}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(2, 149, 255, ${opacity})`,
  labelColor: () => "black",
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#0295ff",
  },
  filtros: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24,
  },
  botaoFiltro: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
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
    fontSize: 16,
  },
  textoBotaoFiltroAtivo: {
    color: "#fff",
  },
  resumoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
  },
  cardResumo: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    alignItems: "center",
  },
  cardTitulo: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    marginBottom: 8,
  },
  cardValor: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#525252",
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#525252",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  grafico: {
    borderWidth: 1,
    borderColor: "#A8A8A8", // Preto mesmo
    borderRadius: 8,
    marginVertical: 16,
    backgroundColor: "#fff",
  },
});

export default Relatorios;
