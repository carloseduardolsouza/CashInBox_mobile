import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      console.log("Dados atualizados!");
      setRefreshing(false);
    }, 2000);
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
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
            value="R$ 80.900,00"
            icon="money" // FontAwesome tem esse ícone
            iconLib={FontAwesome}
            label="Faturamento/Mês"
            variation="+5,8%"
          />
          <InfoCard
            value="R$ 1.000,00"
            icon="analytics" // MaterialIcons tem "analytics"
            iconLib={MaterialIcons}
            label="Ticket Médio"
            variation="+2,3%"
          />
          <InfoCard
            value="12"
            icon="newspaper-outline" // Ionicons tem "newspaper-outline"
            iconLib={Ionicons}
            label="Orçamentos abertos"
            variation="-1,2%"
            isPositive={false}
          />
          <InfoCard
            value="153"
            icon="people" // Ionicons tem "people"
            iconLib={Ionicons}
            label="Clientes ativos"
            variation="+10,5%"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

// seu StyleSheet continua o mesmo

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
  labelCard: {
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
