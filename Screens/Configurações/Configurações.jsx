import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Configuracoes() {
  const navigation = useNavigation();

  const categorias = [
    { nome: "Categorias", icone: "th-list", destino: "Categorias" },
    { nome: "Usuários", icone: "users", destino: "Usuarios" },
    { nome: "Minha Conta", icone: "user-circle", destino: "MinhaConta" },
    { nome: "Estoque", icone: "boxes", destino: "Estoque" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.roleText}>Administrador</Text>
        <Text style={styles.emailText}>carlosreiroyale@gmail.com</Text>
      </View>

      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Plano Pro</Text>
        <Text style={styles.planDate}>Vence dia 14/06/2025</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {categorias.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => navigation.navigate(cat.destino)}
          >
            <FontAwesome5 name={cat.icone} size={20} color="#0295ff" />
            <Text style={styles.categoryText}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    marginBottom: 30,
    marginTop: 20,
    alignItems: "center",
  },
  roleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: "gray",
  },
  planContainer: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  categoryText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default Configuracoes;
