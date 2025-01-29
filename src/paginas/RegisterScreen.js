import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { db } from '../backend/firebase'; // Asegúrate de importar la referencia a Firestore si quieres almacenar datos adicionales
// import { setDoc, doc } from 'firebase/firestore'; // Para agregar datos adicionales al Firestore

/* Fuentes */
import { useFonts } from 'expo-font';
import { Rajdhani_400Regular, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani'
import { Asap_400Regular } from '@expo-google-fonts/asap'

export function RegisterScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
    Rajdhani_700Bold,
    Asap_400Regular,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nick, setNick] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario creado:", user);

      const datosUsuario = {
        nick,
        nombre: firstName,
        apellidos: `${lastName} ${secondLastName}`,
        email,
        user_id: user.uid // id de usuario de Firebase
      };

      const response = await fetch('http://192.168.68.50:8080/proyecto01/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario),
      });

      const data = await response.json();
      console.log('Usuario creado en MongoDB:', data);

      Alert.alert('Éxito', 'Usuario registrado exitosamente'),
      navigation.navigate('Login')
      
      // Agregar datos adicionales a Firestore (opcional)
      // await setDoc(doc(db, 'users', user.uid), {
      //   nick,
      //   firstName,
      //   lastName,
      //   secondLastName,
      //   email,
      // });

      // if(email && password && confirmPassword && nick && firstName && lastName && secondLastName) {
        // Alert.alert('Éxito', 'Usuario registrado exitosamente'),
        // navigation.navigate('Login')
      // }
      // } else {
      //   if (error.code === 'auth/email-already-in-use') {
      //     Alert.alert('Error', 'El correo electrónico ya está registrado');
      //   } else if (error.code === 'auth/invalid-email') {
      //     Alert.alert('Error', 'El correo electrónico no es válido');
      //   } else if (error.code === 'auth/weak-password') {
      //     Alert.alert('Error', 'La contraseña es demasiado débil');
      //   } else {
      //     Alert.alert('Error', error.message);
      //   }
      // }
      // Alert.alert('Éxito', 'Usuario registrado exitosamente'),
      // setTimeout(() => {
      //   console.log("Navegando a Login...");
      //   navigation.navigate('Login');
      // }, 500);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'El correo electrónico ya está registrado');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El correo electrónico no es válido');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'La contraseña es demasiado débil');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/formulario_1.png')} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>Completar los siguientes campos:</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Introduzca su correo" 
        placeholderTextColor="#ccc"
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Introduzca contraseña" 
        placeholderTextColor="#ccc" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Repita contraseña" 
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Introduzca su nick" 
        placeholderTextColor="#ccc"
        keyboardType='default' 
        value={nick}
        onChangeText={setNick}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Introduzca su nombre" 
        placeholderTextColor="#ccc"
        keyboardType='default' 
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Introduzca su primer apellido" 
        placeholderTextColor="#ccc"
        keyboardType='default' 
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Introduzca su segundo apellido" 
        placeholderTextColor="#ccc"
        keyboardType='default' 
        value={secondLastName}
        onChangeText={setSecondLastName}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 20,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 5,
    flexShrink: 0,
  },
  image: {
    width: '100%',
    maxWidth: 300,
    height: 300,
    resizeMode: 'contain',
    paddingBottom: 50,
  },
  title: {
    color: '#9FC63B',
    fontFamily: 'AsapCondensed_700Bold',
    fontSize: 18,
    textAlign: 'left',
    paddingBottom: 20,
    fontWeight: 'bold',
    lineHeight: 27.5,
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: '#fff',
    fontFamily: 'Rajdhani_400Regular',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    padding: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#A0FF4B',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#DFDFDF',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
