import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Modal, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Para seleccionar imágenes
import { useNavigation } from '@react-navigation/native'; // Para navegar entre pantallas
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';  
import { Rajdhani_400Regular, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani'; 

export function AddScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');  // Guarda la URI de la imagen seleccionada
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal de imagen

  const [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
    Rajdhani_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  // Función para pedir permisos de acceso a la galería y cámara
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
      alert('Se requiere permiso para acceder a la cámara o la galería.');
      return false;
    }
    return true;
  };

  // Función para seleccionar una imagen desde la galería
  const elegirImagenDesdeGaleria = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Imagen seleccionada desde la galería:", result.assets[0].uri);
      setImageUri(result.assets[0].uri);  // Guardar la URI de la imagen seleccionada
      setModalVisible(false);  // Cerrar el modal de selección
    }
  };

  // Función para tomar una foto con la cámara
  const tomarUnaFotoDesdeLaCamara = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log("Resultado de la cámara:", result);

    if (!result.canceled) {
      console.log('Foto tomada:', result.assets[0].uri); // Verifica que la URI se obtiene
      setImageUri(result.assets[0].uri);  // Guarda la URI de la foto tomada
      setModalVisible(false);  // Cierra el modal de selección
    }
  };

  // Función para subir la imagen a Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
  
    // Crear un objeto File para que Cloudinary lo reciba correctamente
    const imageFile = {
      uri: file,  // URI de la imagen seleccionada
      type: 'image/jpeg',  // O el tipo correcto dependiendo de la imagen
      name: 'image.jpg',  // Nombre de la imagen (puedes modificarlo)
    };
  
    formData.append('file', imageFile);  // Archivo de la imagen
    formData.append('upload_preset', 'vedrunaApp');  // Preset de carga configurado en Cloudinary
    formData.append('folder', 'appVedruna');  // El folder donde se almacenará la imagen
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dha1ukuh5/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log('Imagen subida exitosamente:', data);
  
      // Verificar si la subida fue exitosa
      if (data.secure_url) {
        return data.secure_url;  // Devuelve la URL segura de la imagen
      } else {
        throw new Error('No se pudo obtener la URL de la imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un problema al subir la imagen');
    }
  };

  // Función para manejar la publicación y navegar a HomeScreen
  const handlePublish = async () => {
    if (!title || !description || !imageUri) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
  
    try {
      const uploadedImageUrl = await handleImageUpload(imageUri);
      console.log("URL de la imagen subida:", uploadedImageUrl);
  
      const userId = await AsyncStorage.getItem('user_id'); // Obtener el ID del usuario actual
      if (!userId) {
        alert('No se pudo obtener el ID del usuario');
        return;
      }
  
      const post = {
        user_id: userId,
        image_url: uploadedImageUrl,
        titulo: title,
        description: description,
      };
  
      const formData = new FormData();
      formData.append('user_id', post.user_id);
      formData.append('titulo', post.titulo);
      formData.append('description', post.description);
      formData.append('image_url', post.image_url);  // Enviar la URL de la imagen
  
      const response = await fetch('http://192.168.68.62:8080/proyecto01/publicaciones/insertarPublicacion', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
  
      if (response.ok) {
        console.log('Publicación guardada correctamente:', data);
        // navigation.navigate('Home', { newPost: data });
      } else {
        console.error('Error al guardar la publicación:', data);
        alert('Hubo un problema al guardar la publicación');
      }
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      alert('Hubo un error al conectar con el servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Rajdhani_700Bold' }]}>PUBLICACIÓN</Text>

      {/* Botón para seleccionar una imagen */}
      <TouchableOpacity style={styles.borderAddPubli} onPress={() => setModalVisible(true)}>
        <View style={styles.vectorImageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
          ) : (
            <Image style={styles.vectorImage} source={require('../../../assets/images/Contacts.png')} />
          )}
        </View>
      </TouchableOpacity>

      {/* Modal para elegir entre la cámara o la galería */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={elegirImagenDesdeGaleria}>
              <Image source={require('../../../assets/images/imagen_galeria.png')} style={styles.modalImage} />
              <Text style={styles.modalText}>Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={tomarUnaFotoDesdeLaCamara}>
              <Image source={require('../../../assets/images/imagen_camara.png')} style={styles.modalImage} />
              <Text style={styles.modalText}>Cámara</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Campos de entrada para el título y la descripción */}
      <View style={styles.containerTextTextInputs}>
        <TextInput
          style={[styles.input, { fontFamily: 'Rajdhani_400Regular' }]}
          placeholder="Máx. 40 Caracteres"
          placeholderTextColor="#D9D9D9"
          maxLength={40}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput, { fontFamily: 'Rajdhani_400Regular' }]}
          placeholder="Máx. 250 Caracteres"
          placeholderTextColor="#D9D9D9"
          maxLength={250}  // Limita el número de caracteres
          multiline  // Permite que el campo sea multilinea
          value={description}
          onChangeText={setDescription}
          onSubmitEditing={() => Keyboard.dismiss()}  // Cierra el teclado cuando se presiona "Intro"
          blurOnSubmit={true}  // Hace que el campo pierda el foco después de presionar "Intro"
        />
      </View>

      {/* Botón para publicar */}
      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishText}>PUBLICAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    paddingTop: 80, 
    alignItems: 'center', 
    paddingBottom: 40,
  },
  borderAddPubli: {
    borderWidth: 5, 
    borderColor: '#A0FF4B',
    borderRadius: 10,
    padding: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',  
    height: '20%', 
    marginTop: 20, 
    position: 'relative',  // Permite que la imagen se coloque sobre el borde
  },
  vectorImageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  vectorImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
  selectedImage: {
    position: 'absolute',  // La imagen se coloca encima de la imagen por defecto
    top: 0, 
    left: 0, 
    right: 0,
    bottom: 0, 
    width: '100%', 
    height: '100%', 
    borderRadius: 10, 
    resizeMode: 'cover',  // Ajusta la imagen para cubrir el contenedor
  },
  title: {
    fontSize: 24,
    color: '#9FC63B', 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  containerTextTextInputs: {
    paddingTop: 50, 
    width: '100%', 
    alignItems: 'center', 
  },
  label: {
    color: '#9FC63B', 
    marginBottom: 10, 
    fontSize: 16,
    justifyContent: 'left',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 300, 
  },
  descriptionInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  publishButton: {
    backgroundColor: '#1F1F1F', 
    borderWidth: 2,
    borderColor: '#A0FF4B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 163,
  },
  publishText: {
    color: '#DFDFDF',           
    fontWeight: 'bold',         
    fontSize: 18,               
    textTransform: 'uppercase', 
  },
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInnerContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    pointerEvents: 'auto' // Permite que el contenido de la modal sea interactuable
  },
  modalButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalText: {
    color: '#A0FF4B',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF4C4C', // Rojo para el botón cancelar
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
