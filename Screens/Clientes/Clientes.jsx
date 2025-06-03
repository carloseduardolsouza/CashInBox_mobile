import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Importa o hook do seu contexto de tema
import { useTheme } from "../../Context/Provider";

function Clientes() {
  const navigation = useNavigation();

  // Pega o estado do tema e a função pra mudar
  const { isDarkMode } = useTheme();

  const CardClientes = ({ nomeCliente }) => (
    <TouchableOpacity
      style={[styles.card , { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" }]}
      onPress={() => navigation.navigate("DetalhesCliente")}
    >
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        style={[styles.avatar , { backgroundColor: isDarkMode ? "#4C4C4C" : "#fff" }]}
      />
      <View style={styles.info}>
        <Text style={[styles.name , { color: isDarkMode ? "white" : "#333" }]}>{nomeCliente}</Text>
        <Text style={[styles.code , { color: isDarkMode ? "gray" : "#333" }]}>Código 001</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={[styles.container , { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title , { color: isDarkMode ? "white" : "#333" }]}>Clientes(0)</Text>

          <TouchableOpacity style={styles.buttonAdicionarCliente}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TextInput placeholder="Pesquisar cliente" style={styles.searchInput} placeholderTextColor="#888"/>

        <View>
          <CardClientes nomeCliente={"Carlos Eduardo Souza"} />
          <CardClientes nomeCliente={"Julia dos santos Bahr"} />
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
    backgroundColor: "#fff",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 8,
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
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#ccc", // fallback caso a imagem não carregue
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  code: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
