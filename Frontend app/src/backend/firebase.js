// Importación de funciones necesarias desde el SDK de Firebase
import { initializeApp } from 'firebase/app';  // Función para inicializar la aplicación Firebase
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';  // Funciones para inicializar la autenticación y establecer persistencia con AsyncStorage
import { getFirestore } from 'firebase/firestore';  // Función para obtener la referencia a Firestore (base de datos)
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  // Importación de AsyncStorage para persistir la sesión de usuario en la app

// Configuración de Firebase (API key, dominio de autenticación, ID de proyecto, etc.)
const firebaseConfig = {
  apiKey: "AIzaSyCWUFG6uTK5PKeWqXaMWXz4ZvuH_FwjDuM", // Clave API para autenticación
  authDomain: "appvedruna-218f0.firebaseapp.com",  // Dominio para la autenticación
  projectId: "appvedruna-218f0",  // ID del proyecto en Firebase
  storageBucket: "appvedruna-218f0.firebasestorage.app",  // Ubicación para el almacenamiento de archivos
  messagingSenderId: "793787123480",  // ID para el servicio de mensajería
  appId: "1:793787123480:web:d44d1968fa4f3e6e6d806d"  // ID único para la aplicación
};

// Inicialización de Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Inicialización de la autenticación de Firebase con persistencia en AsyncStorage (permite que la sesión del usuario se mantenga entre reinicios de la app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)  // Se establece que la persistencia de la sesión se manejará con AsyncStorage
});

// Inicialización de Firestore (base de datos de Firebase para almacenar documentos)
const db = getFirestore(app);  // Obtiene la referencia a la base de datos Firestore de la aplicación Firebase

// Exportación de los objetos de autenticación y Firestore para ser utilizados en otras partes de la aplicación
export { auth, db };
