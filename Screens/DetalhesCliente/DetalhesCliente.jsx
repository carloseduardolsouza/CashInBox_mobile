import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

// Importa o hook do seu contexto de tema
import { useTheme } from "../../Context/Provider";

function DetalhesCliente() {
  // Pega o estado do tema e a função pra mudar
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.divInfoPrincipais}>
            <Image
              style={[
                styles.avatar,
                { backgroundColor: isDarkMode ? "#4C4C4C" : "#fff" },
              ]}
              source={{
                uri: "https://via.placeholder.com/100x100.png?text=Foto",
              }}
            />
            <View style={styles.divInfoPrincipaisText}>
              <Text
                style={[styles.nome, { color: isDarkMode ? "white" : "#333" }]}
              >
                Cliente
              </Text>
              <View style={styles.vendasInfo}>
                <View style={styles.vendaItem}>
                  <Text
                    style={[
                      styles.vendaLabel,
                      { color: isDarkMode ? "white" : "#333" },
                    ]}
                  >
                    Compras
                  </Text>
                  <Text
                    style={[
                      styles.vendaValor,
                      { color: isDarkMode ? "white" : "#333" },
                    ]}
                  >
                    R$ 0,00
                  </Text>
                </View>
                <View style={styles.vendaItem}>
                  <Text
                    style={[
                      styles.vendaLabel,
                      { color: isDarkMode ? "white" : "#333" },
                    ]}
                  >
                    Qtd. Compras
                  </Text>
                  <Text
                    style={[
                      styles.vendaValor,
                      { color: isDarkMode ? "white" : "#333" },
                    ]}
                  >
                    0
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            Nome
          </Text>
          <TextInput style={styles.input} placeholder="Nome do cliente" />

          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            Telefone
          </Text>
          <TextInput
            style={styles.input}
            placeholder="+55"
            keyboardType="phone-pad"
          />

          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            E-mail
          </Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            keyboardType="email-address"
          />

          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            Código
          </Text>
          <TextInput style={styles.input} placeholder="1-1" />

          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            RG/I.E.
          </Text>
          <TextInput style={styles.input} placeholder="Opcional" />

          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            CPF/CNPJ
          </Text>
          <TextInput style={styles.input} placeholder="Opcional" />

          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            Observação
          </Text>
          <TextInput style={styles.input} placeholder="..." />

          <Text
            style={[styles.label, { color: isDarkMode ? "white" : "#333" }]}
          >
            Endereço
          </Text>
          <TextInput style={styles.input} placeholder="..." />
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>SALVAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  divInfoPrincipais: {
    flexDirection: "row",
    padding: 10,
  },
  divInfoPrincipaisText: {
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
    marginVertical: 10,
  },
  nome: {
    fontSize: 24,
    textAlign: "left",
    fontWeight: "bold",
  },
  vendasInfo: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  vendaItem: {
    alignItems: "flex-start",
    width: 100,
  },
  vendaLabel: {
    fontSize: 12,
    color: "#888",
  },
  vendaValor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  botao: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DetalhesCliente;
