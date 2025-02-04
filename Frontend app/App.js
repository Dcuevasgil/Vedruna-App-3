import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/paginas/LoginScreen';
import { RegisterScreen } from './src/paginas/RegisterScreen';
import { StackNavegacionPubli } from './src/navegacion/StackNavegacionPubli';

// Importación correcta de PostDetailScreen
import PostDetailScreen from './src/paginas/tabs/PostDetailScreen'; // Asegúrate de que el archivo y la ruta son correctos

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={StackNavegacionPubli} />
        <Stack.Screen name="Add" component={StackNavegacionPubli} />
        
        {/* Aquí está la importación correcta de la pantalla PostDetail */}
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
