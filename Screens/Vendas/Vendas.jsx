import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
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

function CardVenda({ numero, pagamento, valor, itens, hora }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetalhesVenda')}>
      <View style={styles.cardVenda}>
        <View style={styles.iconVenda}>
          <MaterialIcons name="attach-money" size={20} color="white" />
        </View>

        <View style={styles.infoVenda}>
          <Text style={styles.cliente}>
            N {numero} - {pagamento}
          </Text>
          <Text style={styles.valor}>
            R$ {valor} - {itens} itens
          </Text>
        </View>

        <View>
          <Text>{hora}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Vendas({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [vendas, setVendas] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      numero: `000${i + 1}`,
      pagamento: "Dinheiro",
      valor: (2900 + i * 100).toFixed(2),
      itens: 2 + i,
      hora: "12:10",
    }))
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setVendas((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          numero: `000${prev.length + 1}`,
          pagamento: "Dinheiro",
          valor: (3000 + prev.length * 100).toFixed(2),
          itens: 2 + prev.length,
          hora: "12:10",
        },
      ]);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vendas</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {vendas.map((venda) => (
          <CardVenda
            key={venda.id}
            onPress={() => navigation.navigate("DetalhesVenda", { id: venda.id })}
            numero={venda.numero}
            pagamento={venda.pagamento}
            valor={venda.valor}
            itens={venda.itens}
            hora={venda.hora}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    padding: 15,
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
  iconVenda: {
    backgroundColor: "green",
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoVenda: {
    flex: 1,
    marginHorizontal: 10,
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cliente: {
    fontSize: 14,
    color: "#555",
  },
});

export default Vendas;
