import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const InfoCard = ({ value, label, variation, isPositive = true }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.iconWrapper}>
        <FontAwesome name="money" size={20} color="#0295ff" />
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

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Cash In Box</Text>
          <Text>Bom dia</Text>
        </View>
        <View style={styles.userIcon}>
          <Ionicons name="person" size={20} color="black" />
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <InfoCard
          value="R$ 80.900,00"
          label="Faturamento/Mês"
          variation="+5,8%"
        />
        <InfoCard value="R$ 1.000,00" label="Ticket Médio" variation="+2,3%" />
        <InfoCard
          value="12"
          label="Orçamentos aberto"
          variation="-1,2%"
          isPositive={false}
        />
        <InfoCard
          value="R$ 7.500,00"
          label="Clientes ativos"
          variation="+10,5%"
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

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
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  iconWrapper: {
    backgroundColor: "rgba(154, 154, 154, 0.16)",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  cardValue: {
    fontWeight: "bold",
    fontSize: 18,
  },
  labelCard : {
    color: "#3D3D3D",
    fontSize: 13,
  },
  positivo: {
    color: "green",
    fontWeight: "bold",
  },
  negativo: {
    color: "red",
    fontWeight: "bold",
  },
});
