import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Esta dependencia sirve para crear la barra de iconos inferior
import { Ionicons } from "@expo/vector-icons"; // Para que salgan los iconos de la barra de navegacion inferior
import React from "react";
import { HomeScreen, AddScreen, SettingsScreen } from "../paginas/tabs"; // Importa las pantallas Home, Add y Settings desde la carpeta de tabs

// Definición de la función TabNavegacion que crea la barra de navegación inferior
export function TabNavegacion() {
  const Tab = createBottomTabNavigator(); // Crea el objeto Tab usando createBottomTabNavigator para definir las pestañas de la barra inferior

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Oculta el encabezado en todas las pantallas
        tabBarStyle: { backgroundColor: "#282828" }, // Establece el color de fondo de la barra de navegación inferior
        tabBarActiveTintColor: "#A0FF4B", // Color de los íconos activos
        tabBarInactiveTintColor: "#868686", // Color de los íconos inactivos
      }}
    >
      {/* Definición de la primera pestaña para la pantalla Home */}
      <Tab.Screen
        name="Publicaciones"  // Nombre que se muestra en la barra de navegación
        component={HomeScreen}  // Componente asociado con esta pantalla
        options={{
          tabBarIcon: ({ color, size }) => (  // Definimos el ícono de la pestaña
            <Ionicons name="home" color={color} size={size} />  // Usamos el ícono "home" de Ionicons
          ),
        }}
      />

      {/* Definición de la segunda pestaña para la pantalla Add */}
      <Tab.Screen
        name="Add"  // Nombre que se muestra en la barra de navegación
        component={AddScreen}  // Componente asociado con esta pantalla
        options={{
          tabBarIcon: ({ color, size }) => (  // Definimos el ícono de la pestaña
            <Ionicons name="add" color={color} size={size} />  // Usamos el ícono "add" de Ionicons
          ),
        }}
      />

      {/* Definición de la tercera pestaña para la pantalla Settings */}
      <Tab.Screen
        name="Settings"  // Nombre que se muestra en la barra de navegación
        component={SettingsScreen}  // Componente asociado con esta pantalla
        options={{
          tabBarIcon: ({ color, size }) => (  // Definimos el ícono de la pestaña
            <Ionicons name="settings" color={color} size={size} />  // Usamos el ícono "settings" de Ionicons
          ),
        }}
      />
    </Tab.Navigator>  // Cierre del Tab.Navigator, que agrupa las pestañas definidas
  );
}
