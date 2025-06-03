import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Importa o hook do seu contexto de tema
import { useTheme } from "../../Context/Provider";

function Configuracoes() {
  const navigation = useNavigation();

  // Pega o estado do tema e a função pra mudar
  const { isDarkMode, toggleTheme } = useTheme();

  const categorias = [
    {
      nome: "Aproxime para pagar (InfinitePay)",
      icone: "mobile-alt",
      destino: "InfinitePay",
      novo: true,
    },
    {
      nome: "Maquininha Stone",
      icone: "calculator",
      destino: "MaquininhaStone",
    },
    { nome: "Relatórios", icone: "file-alt", destino: "Relatorios" },
    { nome: "Categoria", icone: "th-large", destino: "Categoria" },
    { nome: "Estoque", icone: "boxes", destino: "Estoque" },
    { nome: "Notificações", icone: "bell", destino: "Notificacoes" },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      <View
        style={[
          styles.profileCard,
          { backgroundColor: isDarkMode ? "#222" : "#f9f9f9" },
        ]}
      >
        <View
          style={[
            styles.profileCircle,
            { backgroundColor: isDarkMode ? "#555" : "#000" },
          ]}
        >
          <Text
            style={[
              styles.profileInitials,
              { color: isDarkMode ? "#eee" : "#fff" },
            ]}
          >
            AD
          </Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={[styles.roleText, { color: isDarkMode ? "#eee" : "#000" }]}
          >
            Administrador
          </Text>
          <Text
            style={[styles.emailText, { color: isDarkMode ? "#bbb" : "gray" }]}
          >
            didicadu123@gmail.com
          </Text>
          <Text
            style={[styles.planText, { color: isDarkMode ? "#eee" : "#000" }]}
          >
            Plano Pro
          </Text>
          <Text
            style={[styles.testText, { color: isDarkMode ? "#bbb" : "gray" }]}
          >
            Em teste até 14/06/2025
          </Text>
          <TouchableOpacity>
            <Text
              style={[
                styles.manageText,
                { color: isDarkMode ? "#0af" : "#007AFF" },
              ]}
            >
              Gerenciar assinatura
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Aqui o toggle do modo escuro */}
      <View
        style={[
          styles.themeToggleContainer,
          { backgroundColor: isDarkMode ? "#222" : "#f9f9f9" },
        ]}
      >
        <Text
          style={[
            styles.themeToggleText,
            { color: isDarkMode ? "#eee" : "#000" },
          ]}
        >
          Modo Escuro
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? "#fff" : "#000"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {categorias.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              { backgroundColor: isDarkMode ? "#222" : "#f9f9f9" },
            ]}
            onPress={() => navigation.navigate(cat.destino)}
          >
            <FontAwesome5
              name={cat.icone}
              size={20}
              color={isDarkMode ? "#eee" : "#000"}
            />
            <Text
              style={[
                styles.categoryText,
                { color: isDarkMode ? "#eee" : "#000" },
              ]}
            >
              {cat.nome}
            </Text>
            {cat.novo && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Novo</Text>
              </View>
            )}
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
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: 15,
    borderRadius: 15,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    fontWeight: "bold",
    fontSize: 18,
  },
  roleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 14,
  },
  planText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  testText: {
    fontSize: 12,
  },
  manageText: {
    marginTop: 5,
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
  themeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Configuracoes;
