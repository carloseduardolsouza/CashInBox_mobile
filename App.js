import React from "react";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { TabView, SceneMap } from "react-native-tab-view";
import * as Animatable from "react-native-animatable";
import { AppProvider, useTheme } from "./Context/Provider";

// Telas
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import Vendas from "./Screens/Vendas/Vendas";
import Clientes from "./Screens/Clientes/Clientes";
import Relatorios from "./Screens/Relatorios/Relatorios";
import Estoque from "./Screens/Estoque/Estoque";
import DetalhesVenda from "./Screens/DetalhesVenda/DetalhesVenda";
import DetalhesProdutos from "./Screens/DetalhesProdutos/DetalhesProdutos";
import Configurações from "./Screens/Configurações/Configurações";
import DetalhesCliente from "./Screens/DetalhesCliente/DetalhesCliente";

const Stack = createStackNavigator();

function AnimatedTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(2); // Começa na Home
  const { isDarkMode } = useTheme();

  const routes = [
    { key: "vendas", icon: "cart-outline" },
    { key: "clientes", icon: "people-outline" },
    { key: "home", icon: "home-outline" },
    { key: "estoque", icon: "cube-outline" },
    { key: "relatorios", icon: "document-text-outline" },
  ];

  const renderScene = SceneMap({
    vendas: Vendas,
    clientes: Clientes,
    home: HomeScreen,
    estoque: Estoque,
    relatorios: Relatorios,
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#121212" : "#FFFFFF"}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={true}
        renderTabBar={() => null}
      />

      <View
        style={[
          styles.menuInferior,
          { backgroundColor: isDarkMode ? "#2F2F2F" : "#FFFFFF" },
        ]}
      >
        {routes.map((route, i) => {
          const focused = index === i;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.itemTab}
              onPress={() => setIndex(i)}
              activeOpacity={0.8}
            >
              <Animatable.View
                animation={focused ? "bounceIn" : undefined}
                duration={800}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Ionicons
                  name={focused ? route.icon.replace("-outline", "") : route.icon}
                  size={28}
                  color={focused ? "#0295ff" : "gray"}
                />
              </Animatable.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

function MainApp() {
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#121212" : "#FFFFFF"}
      />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: isDarkMode ? "#2F2F2F" : "#FFFFFF",
          },
          headerTintColor: isDarkMode ? "#FFFFFF" : "#000000",
        }}
      >
        <Stack.Screen
          name="Main"
          component={AnimatedTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DetalhesVenda"
          component={DetalhesVenda}
          options={{ title: "Detalhes da Venda", headerBackTitle: "Voltar" }}
        />
        <Stack.Screen
          name="Configurações"
          component={Configurações}
          options={{ title: "Configurações", headerBackTitle: "Voltar" }}
        />
        <Stack.Screen
          name="DetalhesProdutos"
          component={DetalhesProdutos}
          options={{
            title: "Detalhes do produto",
            headerBackTitle: "Voltar",
          }}
        />
        <Stack.Screen
          name="DetalhesCliente"
          component={DetalhesCliente}
          options={{
            title: "Detalhes do Cliente",
            headerBackTitle: "Voltar",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    height: 70,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: "center",
  },
  itemTab: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
