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
    { nome: "Aproxime para pagar (InfinitePay)", icone: "mobile-alt", destino: "InfinitePay", novo: true },
    { nome: "Maquininha Stone", icone: "calculator", destino: "MaquininhaStone" },
    { nome: "Relatórios", icone: "file-alt", destino: "Relatorios" },
    { nome: "Categoria", icone: "th-large", destino: "Categoria" },
    { nome: "Estoque", icone: "boxes", destino: "Estoque" },
    { nome: "Notificações", icone: "bell", destino: "Notificacoes" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitials}>AD</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.roleText}>Administrador</Text>
          <Text style={styles.emailText}>didicadu123@gmail.com</Text>
          <Text style={styles.planText}>Plano Pro</Text>
          <Text style={styles.testText}>Em teste até 14/06/2025</Text>
          <TouchableOpacity>
            <Text style={styles.manageText}>Gerenciar assinatura</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {categorias.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => navigation.navigate(cat.destino)}
          >
            <FontAwesome5 name={cat.icone} size={20} color="#000" />
            <Text style={styles.categoryText}>{cat.nome}</Text>
            {cat.novo && <View style={styles.badge}><Text style={styles.badgeText}>Novo</Text></View>}
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
    backgroundColor: "#fff",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: 15,
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  roleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 14,
    color: "gray",
  },
  planText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  testText: {
    fontSize: 12,
    color: "gray",
  },
  manageText: {
    marginTop: 5,
    color: "#007AFF",
    fontSize: 14,
  },
  scrollView: {
    marginTop: 10,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
  },
  categoryText: {
    marginLeft: 15,
    fontSize: 16,
    flex: 1,
  },
  badge: {
    backgroundColor: "#4cd964",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Configuracoes;
