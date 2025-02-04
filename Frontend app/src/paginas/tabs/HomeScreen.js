import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { format } from 'date-fns';  
import { es } from 'date-fns/locale'; 

import { useFonts, AsapCondensed_400Regular } from '@expo-google-fonts/asap-condensed';

export function HomeScreen() {
  const [posts, setPosts] = useState([]); 
  const [userNick, setUserNick] = useState(''); 
  const route = useRoute();
  const newPost = route.params ? route.params.newPost : null;
  const navigation = useNavigation();

  // Función para obtener el nick de un usuario a partir de su user_id
  const fetchUserNick = async (userId) => {
    try {
      const response = await fetch(`http://192.168.68.61:8080/proyecto01/users/${userId}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
      const userData = await response.json();
      return userData.nick || 'Usuario desconocido';
    } catch (error) {
      console.error('Error al obtener el nick del usuario:', error);
      return 'Usuario desconocido';
    }
  };

  // Usamos el useEffect para cargar las publicaciones al cargar la página
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.68.62:8080/proyecto01/publicaciones/obtenerPublicaciones', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log("Posts:", data); 
    
        
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        
        for (let i = 0; i < sortedPosts.length; i++) {
          const post = sortedPosts[i];
          const userNick = await fetchUserNick(post.user_id);
          post.userNick = userNick; 
        }
    
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        Alert.alert('Error', 'No se pudieron cargar las publicaciones');
      }
    };

    fetchPosts();
  }, [newPost]); 

 
  useEffect(() => {
    if (newPost) {
      setPosts(prevPosts => [newPost, ...prevPosts]); 
    }
  }, [newPost]);

  const [fontsLoaded] = useFonts({
    AsapCondensed_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy, hh:mm a", { locale: es });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
      <View style={styles.postContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image_url }} style={styles.selectedImage} />
        </View>
        <Text style={styles.postUser}>Publicado por: {item.userNick || 'Cargando...'}</Text>
        <Text style={styles.postTitle}>{item.titulo}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <Text style={styles.postDate}>{formatDate(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.contenedorCabecera}>
      <Image source={require('../../../assets/images/ic_logo_2.png')} style={styles.logotipo} />
      <View style={styles.textoCabecera}>
        <Text style={styles.nickName}>{userNick || 'Cargando...'}</Text>
        <Text style={styles.textoCabeceraVedruna}>VEDRUNA</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader} 
      ListHeaderComponentStyle={styles.header} 
    />
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#23272A',
  },
  
  contenedorCabecera: {
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'center',  
    paddingHorizontal: 20,  
    paddingVertical: 20,    
    backgroundColor: '#1a1a1a',  
    width: '100%',
    zIndex: 1,
    marginTop: 0,  
  },
  
  textoCabecera: {
    flexDirection: 'column',  
    alignItems: 'flex-start',  
    marginLeft: 10, 
    marginTop: 40,
  },
  
  nickName: {
    fontSize: 18,  
    color: '#fff', 
    marginBottom: 5,  
  },
  
  textoCabeceraVedruna: {
    fontSize: 28,  
    color: '#fff', 
    fontWeight: 'bold',  
  },
  
  logotipo: {
    width: 75,
    height: 75,
    marginRight: 10, 
    marginTop: 35, 
  },
  
  postContainer: {
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 5,
  },
  
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  
  postUser: {
    fontSize: 12,
    color: '#A0FF4B',
    marginTop: 5,
  },
  
  postTitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  
  postDescription: {
    fontSize: 14,
    color: '#DDD',
    marginTop: 5,
  },
  
  postDate: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 5,
  },
});

export default HomeScreen;
