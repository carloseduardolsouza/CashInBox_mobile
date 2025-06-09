import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

// Importa o hook do seu contexto de tema
import { useTheme } from "../../Context/Provider";

// IMPORTANTE: falta importar o fetchapi
import fetchapi from "../../api/fetchapi"; // ajuste conforme o caminho correto

function Clientes() {
  //Controlador de Estados
  const [resultClientes, setResultClientes] = useState([]);
  const [pesquisar, setPesquisar] = useState("");
  const [erroApi, setErroApi] = useState(false); // tava faltando
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  // Pega o estado do tema
  const { isDarkMode } = useTheme();

  const buscarClientes = async () => {
    await fetchapi
      .buscarCliente(pesquisar)
      .then((response) => {
        setErroApi(false);
        setResultClientes(response);
      })
      .catch(() => {
        setErroApi(true);
      });
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const CardClientes = ({ dados }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
      ]}
      onPress={() => navigation.navigate("DetalhesCliente" , {dados: dados})}
    >
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        style={[
          styles.avatar,
          { backgroundColor: isDarkMode ? "#4C4C4C" : "#fff" },
        ]}
      />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDarkMode ? "white" : "#333" }]}>
          {dados.nome}
        </Text>
        <Text style={[styles.code, { color: isDarkMode ? "gray" : "#333" }]}>
          Código {dados.id}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true);
    buscarClientes().finally(() => setRefreshing(false));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDarkMode ? "white" : "#333" }]}
          >
            Clientes({resultClientes.length})
          </Text>

          <TouchableOpacity
            style={styles.buttonAdicionarCliente}
            onPress={() => navigation.navigate("AdicionarCliente")} // ajuste de usabilidade
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Pesquisar cliente"
          style={[styles.searchInput, { color: isDarkMode ? "white" : "#333" }]}
          placeholderTextColor="#888"
          value={pesquisar}
          onChangeText={setPesquisar}
          onSubmitEditing={buscarClientes}
        />

        <View>
          {erroApi ? (
            <Text style={{ color: "red", marginTop: 10 }}>
              Erro ao buscar clientes.
            </Text>
          ) : (
            resultClientes.map((dados, index) => (
              <CardClientes key={index} dados={dados} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Clientes;

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonAdicionarCliente: {
    backgroundColor: "#0295ff",
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    color: "#000",
    marginVertical: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  code: {
    fontSize: 14,
    marginTop: 4,
  },
});
