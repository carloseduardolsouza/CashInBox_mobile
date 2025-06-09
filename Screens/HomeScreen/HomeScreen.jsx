import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import fetchapi from "../../api/fetchapi";
import services from "../../services/services";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Importa o hook do seu contexto de tema
import { useTheme } from "../../Context/Provider";

const InfoCard = ({
  value,
  label,
  icon,
  iconLib,
  variation,
  isPositive = true,
}) => {
  const IconComponent = iconLib || FontAwesome;

  // Pega o estado do tema e a função pra mudar
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
      ]}
    >
      1
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: isDarkMode ? "#4C4C4C" : "#fff" },
          ]}
        >
          <IconComponent name={icon} size={20} color="#0295ff" />
        </View>
        <Text
          style={[styles.cardValue, { color: isDarkMode ? "white" : "#333" }]}
        >
          {value}
        </Text>
      </View>
      <Text style={[styles.labelCard, { color: isDarkMode ? "gray" : "#333" }]}>
        {label}{" "}
        <Text style={isPositive ? styles.positivo : styles.negativo}>
          {variation}
        </Text>
      </Text>
    </View>
  );
};

function HomeScreen() {
  const [relatorios, setRelatorios] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const [mesesGrafico, setMesesGraficos] = useState([]);
  const [receitaGrafico, setReceitaGraficos] = useState([]);

  async function buscarRelatorios() {
    try {
      const response = await fetchapi.buscarRelatoriosBasicos();
      const faturamentos = response.faturamento || [];

      setRelatorios(faturamentos);

      const meses = faturamentos.map((dados) => dados.mes);
      const receitas = faturamentos.map((dados) => dados.faturamento);

      setMesesGraficos(meses);
      setReceitaGraficos(receitas);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    }
  }

  useEffect(() => {
    buscarRelatorios();
  }, []);

  // Pega o estado do tema e a função pra mudar
  const { isDarkMode } = useTheme();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      console.log("Dados atualizados!");
      setRefreshing(false);
    }, 2000);
  };

  const CardProdutosPopulares = () => (
    <View
      style={[
        styles.cardProduto,
        { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
      ]}
    >
      <Image
        source={{ uri: "https://via.placeholder.com/80" }}
        style={[
          styles.imagemProduto,
          { backgroundColor: isDarkMode ? "#4C4C4C" : "#fff" },
        ]}
      />
      <View style={styles.infoProduto}>
        <Text
          style={[styles.nomeProduto, { color: isDarkMode ? "white" : "#333" }]}
        >
          Cômoda Capri
        </Text>
        <Text
          style={[
            styles.codigoProduto,
            { color: isDarkMode ? "gray" : "#333" },
          ]}
        >
          #1023
        </Text>
      </View>
      <View style={styles.statusProduto}>
        <Text style={styles.statusAtivo}>Ativo</Text>
        <Text
          style={[
            styles.vendasProduto,
            { color: isDarkMode ? "white" : "#333" },
          ]}
        >
          13 Vendas
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
          <View>
            <Text
              style={[styles.title, { color: isDarkMode ? "white" : "#333" }]}
            >
              Cash In Box
            </Text>
            <Text style={{ color: isDarkMode ? "gray" : "#333" }}>Bom dia</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.userIcon,
              { backgroundColor: isDarkMode ? "#2F2F2F" : "#fff" },
            ]}
            onPress={() => navigation.navigate("Configurações")}
          >
            <Ionicons
              name="person"
              size={20}
              color={isDarkMode ? "white" : "#333"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <InfoCard
            value={services.formatarCurrency(relatorios?.[6]?.faturamento || 0)}
            icon="money"
            iconLib={FontAwesome}
            label="Faturamento/Mês"
            variation={relatorios?.[6]?.variacao}
          />
          <InfoCard
            value="R$ 700,00"
            icon="analytics"
            iconLib={MaterialIcons}
            label="Ticket Médio"
            variation="+2,3%"
          />
          <InfoCard
            value="12"
            icon="newspaper-outline"
            iconLib={Ionicons}
            label="Orçamentos abertos"
            variation="-1,2%"
            isPositive={false}
          />
          <InfoCard
            value="153"
            icon="people"
            iconLib={Ionicons}
            label="Clientes ativos"
            variation="+10,5%"
          />
        </View>

        <View
          style={[
            styles.divMeta,
            { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
          ]}
        >
          <View style={styles.textDivMeta}>
            <Text
              style={[
                styles.textMeta,
                { color: isDarkMode ? "white" : "#333" },
              ]}
            >
              Meta "2mil faturamento"
            </Text>
            <Text
              style={[
                styles.textMeta,
                { color: isDarkMode ? "white" : "#333" },
              ]}
            >
              25%
            </Text>
          </View>
          <View
            style={[
              styles.barraProgreçãoMeta,
              { backgroundColor: isDarkMode ? "#4C4C4C" : "#f9f9f9" },
            ]}
          >
            <View style={[styles.progressFill, { width: "25%" }]} />
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.textProdutosPopulares,
              { color: isDarkMode ? "white" : "#333" },
            ]}
          >
            Produtos Populares
          </Text>
          <CardProdutosPopulares />
          <CardProdutosPopulares />
          <CardProdutosPopulares />
        </View>

        <View
          style={[
            styles.graficoContainer,
            { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
          ]}
        >
          <Text
            style={[
              styles.tituloGrafico,
              { color: isDarkMode ? "white" : "#333" },
            ]}
          >
            Receitas vs Despesas
          </Text>
          <LineChart
            data={{
              labels: mesesGrafico,
              datasets: [
                {
                  data: receitaGrafico,
                  color: (opacity = 1) => `rgba(2, 149, 255, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: [0, 0, 0, 0, 0, 0 , 0],
                  color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
              legend: ["Receitas", "Despesas"],
            }}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: isDarkMode ? "#4C4C4C" : "#f9f9f9",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#0295ff",
              },
            }}
            bezier
            style={{
              borderRadius: 10,
              marginTop: 10,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    padding: "2%",
    marginTop: "2%",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: "4%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4%",
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06, // ~24 em telas médias
    fontWeight: "600",
    color: "#333",
  },
  userIcon: {
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.15,
    borderRadius: SCREEN_WIDTH * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  cardsContainer: {
    marginTop: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  textProdutosPopulares: {
    marginVertical: "2%",
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: "600",
    color: "#333",
  },
  card: {
    width: "48%",
    padding: "4%",
    marginBottom: "4%",
    borderRadius: 12,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
  iconWrapper: {
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.1,
    marginRight: "3%",
    borderRadius: SCREEN_WIDTH * 0.05,
  },
  cardValue: {
    fontWeight: "600",
    fontSize: SCREEN_WIDTH * 0.04,
    color: "#333",
  },
  labelCard: {
    color: "#777",
    fontSize: SCREEN_WIDTH * 0.03,
  },
  positivo: {
    color: "#2ecc71",
    fontWeight: "500",
  },
  negativo: {
    color: "#e74c3c",
    fontWeight: "500",
  },
  divMeta: {
    padding: "4%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: "3%",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  textMeta: {
    fontWeight: "500",
    fontSize: SCREEN_WIDTH * 0.035,
    color: "#333",
  },
  textDivMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barraProgreçãoMeta: {
    height: SCREEN_WIDTH * 0.02,
    backgroundColor: "#f0f0f0",
    borderRadius: SCREEN_WIDTH * 0.01,
    marginTop: "2%",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0295ff",
    borderRadius: SCREEN_WIDTH * 0.01,
  },
  cardProduto: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "3%",
    marginVertical: "2%",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  imagemProduto: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    borderRadius: SCREEN_WIDTH * 0.02,
    marginRight: "4%",
  },
  infoProduto: {
    flex: 1,
    justifyContent: "center",
  },
  nomeProduto: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: "600",
  },
  codigoProduto: {
    fontSize: SCREEN_WIDTH * 0.03,
    color: "#999",
    marginTop: "1%",
  },
  statusProduto: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  statusAtivo: {
    fontSize: SCREEN_WIDTH * 0.03,
    fontWeight: "600",
    color: "#2ecc71",
    marginBottom: "1%",
  },
  vendasProduto: {
    fontSize: SCREEN_WIDTH * 0.03,
    color: "#333",
  },
  graficoContainer: {
    marginTop: "5%",
    padding: "4%",
    marginBottom: "15%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tituloGrafico: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: "600",
    marginBottom: "2%",
    color: "#333",
  },
});
