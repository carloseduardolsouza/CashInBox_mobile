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
  TextInput,
} from "react-native";

function CardVenda({ numero, pagamento, valor, itens, descricao, hora }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetalhesVenda')}>
      <View style={styles.cardVenda}>
        <View style={styles.iconVenda}>
          <MaterialIcons name="attach-money" size={18} color="#000" />
        </View>
        <View style={styles.infoVenda}>
          <Text style={styles.numero}>Nº {numero} • {pagamento}</Text>
          <Text style={styles.valor}>R$ {valor} : {itens} Item{itens > 1 ? 's' : ''}</Text>
          <Text style={styles.descricao}>{descricao}</Text>
        </View>
        <Text style={styles.hora}>{hora}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Vendas({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [vendas, setVendas] = useState([
    {
      id: 1,
      numero: '0003-1',
      pagamento: 'Dinheiro',
      valor: '0,00',
      itens: 1,
      descricao: '1x headset',
      hora: '00:21',
      data: '2 JUN'
    },
    {
      id: 2,
      numero: '0002-1',
      pagamento: 'Dinheiro',
      valor: '20,00',
      itens: 2,
      descricao: '1x headset 1x cômoda capri...',
      hora: '12:01',
      data: '31 MAI 2025'
    }
  ]);

  const total = vendas.reduce((acc, venda) => acc + parseFloat(venda.valor.replace(',', '.')), 0).toFixed(2);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setVendas((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          numero: `000${prev.length + 1}-1`,
          pagamento: "Dinheiro",
          valor: "10,00",
          itens: 1,
          descricao: "1x item novo",
          hora: "12:10",
          data: "2 JUN"
        }
      ]);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.periodo}>Últimos 7 dias</Text>
        <Text style={styles.total}>Total: R$ {total}</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Código"
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>

        {vendas.map((venda, index) => (
          <View key={venda.id}>
            {/* Mostra a data se for diferente da anterior */}
            {(index === 0 || venda.data !== vendas[index - 1].data) && (
              <View style={styles.dataContainer}>
                <Text style={styles.dataTexto}>
                  {venda.data === '2 JUN' ? 'HOJE, 2 JUN' : venda.data}
                </Text>
              </View>
            )}

            <CardVenda
              numero={venda.numero}
              pagamento={venda.pagamento}
              valor={venda.valor}
              itens={venda.itens}
              descricao={venda.descricao}
              hora={venda.hora}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  periodo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  searchContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#000'
  },
  dataContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  dataTexto: {
    fontWeight: 'bold',
    color: '#333',
  },
  cardVenda: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  iconVenda: {
    backgroundColor: "#e0f7e9",
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  infoVenda: {
    flex: 1,
  },
  numero: {
    fontSize: 14,
    fontWeight: '600',
  },
  valor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  descricao: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  hora: {
    fontSize: 12,
    color: '#888',
  },
});

export default Vendas;
