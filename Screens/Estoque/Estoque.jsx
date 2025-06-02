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
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function Estoque() {
  const handleAdicionarCliente = () => {
    console.log("Adicionar cliente clicado!");
  };
  const navigation = useNavigation();

  const CardProdutos = ({ nomeProdutos, preco }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DetalhesProdutos", {
          nomeProduto: nomeProdutos,
        })
      }
    >
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{nomeProdutos}</Text>
        <Text style={styles.code}>{preco}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Produtos(0)</Text>

          <TouchableOpacity
            style={styles.buttonAdicionarCliente}
            onPress={handleAdicionarCliente}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TextInput placeholder="Pesquisar Produto" style={styles.searchInput} />

        <View>
          <CardProdutos nomeProdutos={"Comoda Capri"} preco={"R$ 200,00"} />
          <CardProdutos nomeProdutos={"Beliche Casal"} preco={"R$ 500,00"} />
          <CardProdutos
            nomeProdutos={"Guarda Roupas Cedro"}
            preco={"R$ 1.500,00"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Estoque;

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
    width: 80,
    height: 80,
    borderRadius: 5,
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
