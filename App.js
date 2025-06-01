import React from "react";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { TabView, SceneMap } from "react-native-tab-view";

// Telas
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import Vendas from "./Screens/Vendas/Vendas";
import Clientes from "./Screens/Clientes/Clientes";
import Relatorios from "./Screens/Relatorios/Relatorios";
import Estoque from "./Screens/Estoque/Estoque";
import DetalhesVenda from "./Screens/DetalhesVenda/DetalhesVenda";
import Configurações from "./Screens/Configurações/Configurações";

const Stack = createStackNavigator();

function AnimatedTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(2); // Começa na Home

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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={true}
        renderTabBar={() => null} // Remove aquela bosta de menu superior
      />

      {/* Menu Inferior */}
      <View style={styles.menuInferior}>
        {routes.map((route, i) => {
          const focused = index === i;
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.itemTab}
              onPress={() => setIndex(i)}
            >
              <Ionicons
                name={focused ? route.icon.replace("-outline", "") : route.icon}
                size={24}
                color={focused ? "#0295ff" : "gray"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {/* Principal com abas animadas */}
        <Stack.Screen
          name="Main"
          component={AnimatedTabs}
          options={{ headerShown: false }}
        />

        {/* Telas secundárias */}
        <Stack.Screen
          name="DetalhesVenda"
          component={DetalhesVenda}
          options={{
            title: "Detalhes da Venda",
            headerBackTitle: "Voltar",
          }}
        />

        <Stack.Screen
          name="Configurações"
          component={Configurações}
          options={{
            title: "Configurações",
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
    backgroundColor: "#fff",
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
