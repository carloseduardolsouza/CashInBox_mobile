import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Telas
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import Vendas from "./Screens/Vendas/Vendas";
import Clientes from "./Screens/Clientes/Clientes";
import Relatorios from "./Screens/Relatorios/Relatorios";
import Estoque from "./Screens/Estoque/Estoque";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Vendas") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Clientes") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Estoque") {
              iconName = focused ? "cube" : "cube-outline";
            } else if (route.name === "Relatorios") {
              iconName = focused ? "document-text" : "document-text-outline";
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: "#0295ff",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false, // remove o texto
          tabBarStyle: styles.menuInferior, // aplica o estilo
          tabBarItemStyle: styles.itemTab, // opcional, melhora o toque
        })}
      >
        <Tab.Screen name="Vendas" component={Vendas} />
        <Tab.Screen name="Clientes" component={Clientes} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Estoque" component={Estoque} />
        <Tab.Screen name="Relatorios" component={Relatorios} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuInferior: {
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    left: 10, // <<< margem lateral
    right: 10, // <<< margem lateral
    height: 70,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  itemTab: {
    paddingVertical: 10,
  },
});
