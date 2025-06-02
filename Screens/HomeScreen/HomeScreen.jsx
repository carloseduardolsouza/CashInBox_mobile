import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

const InfoCard = ({
  value,
  label,
  icon,
  iconLib,
  variation,
  isPositive = true,
}) => {
  const IconComponent = iconLib || FontAwesome;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconWrapper}>
          <IconComponent name={icon} size={20} color="#0295ff" />
        </View>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
      <Text style={styles.labelCard}>
        {label}{" "}
        <Text style={isPositive ? styles.positivo : styles.negativo}>
          {variation}
        </Text>
      </Text>
    </View>
  );
};

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      console.log("Dados atualizados!");
      setRefreshing(false);
    }, 2000);
  };

  const CardProdutosPopulares = () => (
    <View style={styles.cardProduto}>
      <Image
        source={{ uri: "https://via.placeholder.com/80" }}
        style={styles.imagemProduto}
      />
      <View style={styles.infoProduto}>
        <Text style={styles.nomeProduto}>Cômoda Capri</Text>
        <Text style={styles.codigoProduto}>#1023</Text>
      </View>
      <View style={styles.statusProduto}>
        <Text style={styles.statusAtivo}>Ativo</Text>
        <Text style={styles.vendasProduto}>13 Vendas</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cash In Box</Text>
            <Text>Bom dia</Text>
          </View>
          <TouchableOpacity
            style={styles.userIcon}
            onPress={() => navigation.navigate("Configurações")}
          >
            <Ionicons name="person" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <InfoCard
            value="R$ 47.900,00"
            icon="money"
            iconLib={FontAwesome}
            label="Faturamento/Mês"
            variation="+5,8%"
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

        <View style={styles.divMeta}>
          <View style={styles.textDivMeta}>
            <Text style={styles.textMeta}>Meta "2mil faturamento"</Text>
            <Text style={styles.textMeta}>25%</Text>
          </View>
          <View style={styles.barraProgreçãoMeta}>
            <View style={[styles.progressFill, { width: "25%" }]} />
          </View>
        </View>

        <View>
          <Text style={styles.textProdutosPopulares}>Produtos Populares</Text>
          <CardProdutosPopulares />
          <CardProdutosPopulares />
          <CardProdutosPopulares />
        </View>

        <View style={styles.graficoContainer}>
          <Text style={styles.tituloGrafico}>Receitas vs Despesas</Text>
          <LineChart
            data={{
              labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
              datasets: [
                {
                  data: [5000, 7000, 8000, 6000, 7500, 9000],
                  color: (opacity = 1) => `rgba(2, 149, 255, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: [3000, 4000, 4500, 5000, 4200, 6000],
                  color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
              legend: ["Receitas", "Despesas"],
            }}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
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
    padding: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    backgroundColor: "#fff", // Fundo branco clean
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600", // Deixa menos pesado
    color: "#333",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  cardsContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  textProdutosPopulares: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  card: {
    width: "48%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconWrapper: {
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  cardValue: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  labelCard: {
    color: "#777",
    fontSize: 12,
  },
  positivo: {
    color: "#2ecc71", // Verde suave
    fontWeight: "500",
  },
  negativo: {
    color: "#e74c3c", // Vermelho suave
    fontWeight: "500",
  },
  divMeta: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  textMeta: {
    fontWeight: "500",
    fontSize: 14,
    color: "#333",
  },
  textDivMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barraProgreçãoMeta: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0295ff",
    borderRadius: 4,
  },
  cardProduto: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  imagemProduto: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f9f9f9",
  },
  infoProduto: {
    flex: 1,
    justifyContent: "center",
  },
  nomeProduto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  codigoProduto: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  statusProduto: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  statusAtivo: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2ecc71",
    marginBottom: 4,
  },
  vendasProduto: {
    fontSize: 12,
    color: "#333",
  },
  graficoContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tituloGrafico: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
});
