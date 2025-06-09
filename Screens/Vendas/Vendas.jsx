import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import services from "../../services/services";
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

import { useTheme } from "../../Context/Provider";
import { useState, useEffect } from "react";
import fetchapi from "../../api/fetchapi";

function CardVenda({ dados }) {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [produtosVenda , setProdutosVenda] = useState([])

  if (!dados) return null; // segurança básica

  async function buscarProdutosVenda() {
    await fetchapi.buscarProdutosVenda(dados.id).then((response) => setProdutosVenda(response));
  }

  useEffect(() => {
    buscarProdutosVenda()
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetalhesVenda", { dados: dados , produtos: produtosVenda })}
    >
      <View
        style={[
          styles.cardVenda,
          { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
        ]}
      >
        <View style={styles.iconVenda}>
          <MaterialIcons name="attach-money" size={18} color="#000" />
        </View>
        <View style={styles.infoVenda}>
          <Text
            style={[styles.numero, { color: isDarkMode ? "white" : "#333" }]}
          >
            Nº {dados.id} • {services.formatarDataCurta(dados.data_venda)}
          </Text>
          <Text
            style={[styles.valor, { color: isDarkMode ? "white" : "#333" }]}
          >
            {services.formatarCurrency(dados.valor_total)} •{" "}
            {produtosVenda.length} Itens
          </Text>
          <Text
            style={[styles.descricao, { color: isDarkMode ? "gray" : "#333" }]}
          >
            {dados.nome_cliente}
          </Text>
        </View>
        <Text style={[styles.hora, { color: isDarkMode ? "white" : "#333" }]}>
          {services.formatarHorario(dados.data_venda)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function Vendas() {
  const [resultadosVendas, setResultadosVendas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const { isDarkMode } = useTheme();

  const carregarVendas = async () => {
    try {
      const response = await fetchapi.buscarVendas();
      setResultadosVendas(response);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
    }
  };

  useEffect(() => {
    carregarVendas();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarVendas().finally(() => setRefreshing(false));
  };

  const totalVendas = resultadosVendas.reduce(
    (total, venda) => total + (venda.valor_total || 0),
    0
  );

  const vendasFiltradas = resultadosVendas.filter((venda) =>
    venda.id.toString().includes(search)
  );

  const renderVendas = () => {
    let ultimaData = null;

    return vendasFiltradas.map((venda) => {
      const dataFormatada = services.formatarDataCurta(venda.data_venda);

      const mostrarData = dataFormatada !== ultimaData;
      ultimaData = dataFormatada;

      return (
        <View key={venda.id}>
          {mostrarData && (
            <View style={styles.dataContainer}>
              <Text
                style={[
                  styles.dataTexto,
                  { color: isDarkMode ? "white" : "#333" },
                ]}
              >
                {dataFormatada}
              </Text>
            </View>
          )}
          <CardVenda dados={venda} />
        </View>
      );
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={[styles.periodo, { color: isDarkMode ? "white" : "#333" }]}
        >
          Últimos 7 dias
        </Text>
        <Text style={[styles.total, { color: isDarkMode ? "white" : "#333" }]}>
          Total: {services.formatarCurrency(totalVendas)}
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar por código"
            style={[styles.input, { color: isDarkMode ? "white" : "#000" }]}
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            value={search}
            onChangeText={setSearch}
            keyboardType="numeric"
          />
        </View>

        {vendasFiltradas.length > 0 ? (
          renderVendas()
        ) : (
          <Text style={{ color: isDarkMode ? "white" : "#333", marginTop: 20 }}>
            Nenhuma venda encontrada.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    padding: 20,
  },
  periodo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  dataContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  dataTexto: {
    fontWeight: "bold",
    fontSize: 14,
  },
  cardVenda: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#ddd",
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
    fontWeight: "600",
  },
  valor: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },
  descricao: {
    fontSize: 12,
    marginTop: 2,
  },
  hora: {
    fontSize: 12,
  },
});

export default Vendas;
