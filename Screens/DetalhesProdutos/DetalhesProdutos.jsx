import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons"; // ícones para dar aquele charme

function DetalhesProdutos({ route }) {
  const { nomeProduto } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.principalInfoProdutos}>
          {/* Imagem */}
          <TouchableOpacity style={styles.imageBox}>
            <Ionicons name="camera" size={24} color="#9CA3AF" />
            <Text style={styles.imageText}>Adicionar Imagem</Text>
          </TouchableOpacity>

          {/* Descrição */}
          <View style={styles.fieldPrincipalInfoProdutos}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.textValue}>{nomeProduto}</Text>
          </View>
        </View>

        {/* Preço de Venda */}
        <View style={styles.field}>
          <Text style={styles.label}>Preço de Venda</Text>
          <Text style={styles.textValue}>R$ 20,00</Text>
        </View>

        {/* Markup */}
        <View style={styles.field}>
          <Text style={styles.label}>Markup</Text>
          <Text style={styles.textValue}>0 %</Text>
        </View>

        {/* Preço de Custo */}
        <View style={styles.field}>
          <Text style={styles.label}>Preço de Custo</Text>
          <Text style={styles.textValue}>R$ 0,00</Text>
        </View>

        {/* Controlar Estoque */}
        <View style={styles.switchRow}>
          <Text style={styles.label}>Controlar estoque</Text>
          <Switch value={false} />
        </View>

        {/* Estoque */}
        <View style={styles.field}>
          <Text style={styles.label}>Estoque Atual</Text>
          <Text style={styles.textValue}>0</Text>
        </View>

        {/* Estoque Minimo */}
        <View style={styles.field}>
          <Text style={styles.label}>Estoque Minimo</Text>
          <Text style={styles.textValue}>0</Text>
        </View>

        {/* Categoria */}
        <TouchableOpacity style={styles.field}>
          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.link}>Criar uma categoria</Text>
        </TouchableOpacity>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>SALVAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 20,
  },
  imageBox: {
    width: 100,
    height: 100,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  principalInfoProdutos: {
    flexDirection: "row",
  },
  imageText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
    textAlign: "center",
  },
  fieldPrincipalInfoProdutos: {
    padding: 10
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
  },
  textValue: {
    fontSize: 16,
    color: "#111827",
  },
  link: {
    fontSize: 16,
    color: "#3B82F6",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DetalhesProdutos;
