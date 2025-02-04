import React from 'react';  // Importación de React para utilizar JSX
import { createStackNavigator } from '@react-navigation/stack';  // Importación de la función 'createStackNavigator' para la creación de una pila de navegación
import { SafeAreaView } from 'react-native';  // Importación de 'SafeAreaView' para asegurar que los contenidos no se superpongan con áreas no visibles en el dispositivo
import { HomeScreen, AddScreen } from '../paginas/tabs';  // Importación de las pantallas HomeScreen y AddScreen desde el archivo de rutas de las páginas
import { TabNavegacion } from './TabNavegacion';  // Importación de TabNavegacion que es la barra de navegación entre diferentes pantallas

// Función que define la navegación entre las pantallas de la aplicación
export function StackNavegacionPubli() {
    const Stack = createStackNavigator();  // Creación de un stack navigator (navegación por pila) para gestionar las pantallas

    return (
        <Stack.Navigator>
            {/* Uso TabNavegacion como pantalla principal para navegar entre las pantallas de Home y Add */}
            <Stack.Screen
                name="TabNavegacion"  // Nombre de la pantalla que aparece en la pila
                component={TabNavegacion}  // Componente que se usará como pantalla en esta ruta
                options={{ 
                    headerShown: false  // Ocultamos el encabezado de la pila de navegación en esta pantalla
                }}
            />
        </Stack.Navigator>  // Definición del stack con una única pantalla (TabNavegacion)
    );
}