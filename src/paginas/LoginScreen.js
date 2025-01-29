import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

/* Fuentes */
import { useFonts } from 'expo-font';
import { Rajdhani_400Regular, Rajdhani_700Bold, Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani'
import { Asap_400Regular, Asap_700Bold } from '@expo-google-fonts/asap'

export function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
    Rajdhani_600SemiBold,
    Rajdhani_700Bold,
    Asap_400Regular,
    Asap_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Cargando fuentes...</Text>;
  }

  // Función para controlar el logueo de los usuarios
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, introduce tu correo y contraseña');
      return;
    }

    try {
      // Autenticacion a traves de la pagina de Firebase
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Navegamos a StackNavegacionPubli (donde estarán las pantallas HomeScreen y AddScreen)
      navigation.navigate('Home');
    } catch(error) {
      console.error("Error en el login:", error);
      if(error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Usuario no encontrado');
      } else if(error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Contraseña incorrecta');
      } else {
        Alert.alert('Error', error.message);
      }
    }

    // Si los campos están completos, navegar a la pantalla Home
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/ic_logo_1.png')} style={styles.logo} />
          <Text style={styles.title}>VEDRUNA EDUCACIÓN</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Introduce tu correo o nick..."
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Introduce tu contraseña..."
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotText}>¿Olvidaste la contraseña?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>

      {/* Línea y texto "¿No tienes cuenta?" */}
      <View style={styles.line}></View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Text style={styles.signupText}>
            ¿No tienes cuenta? <Text style={styles.signupLink} onPress={() => navigation.navigate('Register')}>Crear cuenta</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  upperContainer: {
    flex: 1, 
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40, 
  },
  logo: {
    width: 180, 
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 36, 
    fontFamily: 'Asap_700Bold',
    color: '#fff',
    textAlign: 'center',
    flexWrap: 'wrap', 
    marginHorizontal: 20, 
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 12, 
    backgroundColor: '#333',
    borderRadius: 10,
    color: '#fff',
    fontFamily: 'Rajdhani_400Regular',
  },
  forgotPasswordContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 10, 
  },
  forgotText: {
    color: '#9FC63B', 
    textAlign: 'center',
    fontFamily: 'Rajdhani_400Regular',
  },
  button: {
    backgroundColor: '#9FC63B', 
    paddingVertical: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#23272A',
    fontFamily: 'Rajdhani_600SemiBold',
    fontSize: 18,
  },
  signupText: {
    color: '#fff',
    fontFamily: 'Rajdhani_400Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  line: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#323639', 
    marginTop: 20,
  },
  signupLink: {
    color: '#9FC63B', 
    fontFamily: 'Rajdhani_400Regular', 
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 20, 
  },
});

export default LoginScreen;
