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

import { useTheme } from "../../Context/Provider";
import { useNavigation } from "@react-navigation/native";
import fetchapi from "../../api/fetchapi";
import { useState, useEffect } from "react";
import services from "../../services/services";

function Estoque() {
  const navigation = useNavigation();

  // Estado dos produtos, loading e pesquisa
  const [resultProdutos, setResultProdutos] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(false); // Começa false, pq logo busca
  const [refreshing, setRefreshing] = useState(false);
  const [pesquisar, setPesquisar] = useState("");

  // Busca produtos, atualizado para lidar com loading corretamente
  const buscarProdutos = async () => {
    setLoadingProdutos(true);
    try {
      const resultado = await fetchapi.buscarProdutos(pesquisar);
      setResultProdutos(resultado);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setResultProdutos([]); // limpa caso erro
    }
    setLoadingProdutos(false);
  };

  // Rodar a busca no load e sempre que 'pesquisar' mudar
  useEffect(() => {
    buscarProdutos();
  }, [pesquisar]);

  // Handle pesquisa no input
  const handlePesquisarChange = (text) => {
    setPesquisar(text);
  };

  // Função pro botão adicionar cliente (produto?), aqui só loga mesmo
  const handleAdicionarCliente = () => {
    console.log("Adicionar cliente clicado!");
  };

  // Hook tema
  const { isDarkMode } = useTheme();

  // Card do produto - cuidado com o state dentro de map (se renderizar muita coisa pode travar)
  // Talvez melhorar futuramente para carregar imagens fora do card e passar via props
  const CardProdutos = ({ dados }) => {
    const [image, setImage] = useState(null);

    async function carregarImagem() {
      try {
        const imagens = await fetchapi.buscarImagensProduto(dados.id);
        if (imagens && imagens.length > 0) {
          setImage(imagens[0].imagem_path);
        }
      } catch (error) {
        console.error("Erro ao carregar imagem do produto:", error);
      }
    }

    useEffect(() => {
      carregarImagem();
    }, []);

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: isDarkMode ? "#2F2F2F" : "#f9f9f9" },
        ]}
        onPress={() =>
          navigation.navigate("DetalhesProdutos", {
            dados: dados,
            image: image
          })
        }
      >
        <Image
          source={{ uri: `http://192.168.1.66:3322/uploads/${image}` }}
          style={[
            styles.avatar,
            { backgroundColor: isDarkMode ? "#4C4C4C" : "#fff" },
          ]}
        />

        <View style={styles.info}>
          <Text style={[styles.name, { color: isDarkMode ? "white" : "#333" }]}>
            {dados.nome_produto || dados.nome}
          </Text>
          <Text style={[styles.code, { color: isDarkMode ? "gray" : "#333" }]}>
            {services.formatarCurrency(dados.preco_venda)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    buscarProdutos().finally(() => setRefreshing(false));
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
            Produtos ({resultProdutos.length})
          </Text>

          <TouchableOpacity
            style={styles.buttonAdicionarCliente}
            onPress={handleAdicionarCliente}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Pesquisar Produto"
          style={[styles.searchInput, { color: isDarkMode ? "white" : "#333" }]}
          placeholderTextColor="#888"
          value={pesquisar}
          onChangeText={handlePesquisarChange}
          returnKeyType="search"
          onSubmitEditing={buscarProdutos} // busca quando aperta enter
        />

        <View>
          {loadingProdutos ? (
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                color: isDarkMode ? "#ccc" : "#333",
              }}
            >
              Carregando produtos...
            </Text>
          ) : (
            resultProdutos.map((dados) => (
              <CardProdutos key={dados.id.toString()} dados={dados} />
            ))
          )}
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
