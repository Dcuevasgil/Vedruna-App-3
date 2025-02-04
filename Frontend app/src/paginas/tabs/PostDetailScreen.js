import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostDetailScreen = ({ route, navigation }) => {
  const { post } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const handlePublishComment = async () => {
    try {
      // Verificar que el comentario no esté vacío antes de enviarlo
      if (comment.trim() === '') {
        console.log('El comentario no puede estar vacío');
        return;  // No enviar la solicitud si el comentario está vacío
      }

      // Este console.log se ejecuta solo cuando se envía el comentario
      console.log('Comentario a enviar:', comment);

      const response = await fetch('http://192.168.68.62:8080/proyecto01/comentarios/put', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: post.user_id,
          idPublicacion: post.id,
          comentario: comment,  
        }),
      });

      const data = await response.json();
      console.log('Comentario guardado:', data);
      setComment('');  
      setModalVisible(false);  
    } catch (error) {
      console.error('Error al publicar el comentario:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Icono de volver */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="chevron-back-outline" size={40} color="#9FC63B" />
        </TouchableOpacity>

        {/* Foto del usuario (Coche deportivo) */}
        <View style={styles.profileImageWrapper}>
          <Image 
            source={require('../../../assets/images/corvette.png')} 
            style={styles.profileImage}
          />
        </View>
      </View>

      <View style={styles.header}>
        <Image source={{ uri: post.image_url }} style={styles.image} />
        <Text style={styles.userName}>Publicado por: {post.userNick || 'Usuario desconocido'}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{post.titulo}</Text>
        {post.description ? (
          <Text style={styles.description}>{post.description}</Text>
        ) : (
          <Text style={styles.description}>No hay descripción disponible</Text>
        )}
        <Text style={styles.date}>Fecha: {formatDate(post.createdAt)}</Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.commentButton}>
        <Image
          source={require('../../../assets/images/comentarios.png')}
          style={styles.commentIcon}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comentario:</Text>
            <TextInput
              style={styles.input}
              value={comment}  
              onChangeText={setComment} 
              placeholder="Máx. 500 Caracteres"
              maxLength={500}
              multiline
              onSubmitEditing={() => Keyboard.dismiss()}  
              blurOnSubmit={true} 
            />

            <Button title="Publicar" onPress={handlePublishComment} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    padding: 20,
  },

  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    marginBottom: 20,
    marginTop: 20
  },

  goBackButton: {
    padding: 10,
  },

  profileImageWrapper: {
    backgroundColor: '#9FC63B', 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3, 
  },

  profileImage: {
    width: 44, 
    height: 44, 
    borderRadius: 22, 
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },

  userName: {
    fontSize: 18,
    color: '#A0FF4B',
  },

  details: {
    marginTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },

  description: {
    fontSize: 16,
    color: '#DDD',
    marginTop: 10,
  },

  date: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 5,
  },

  commentButton: {
    position: 'absolute',
    top: 85,
    right: 20,
    backgroundColor: '#A0FF4B',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },

  commentIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#23272A',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },

  modalTitle: {
    fontSize: 18,
    color: '#A0FF4B',
    marginBottom: 10,
  },

  input: {
    height: 100,
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});

export default PostDetailScreen;
