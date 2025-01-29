import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/paginas/LoginScreen';
import { RegisterScreen } from './src/paginas/RegisterScreen';
import { StackNavegacionPubli } from './src/navegacion/StackNavegacionPubli'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={StackNavegacionPubli} />
        <Stack.Screen name="Add" component={StackNavegacionPubli} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}