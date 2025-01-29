import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Para acceder a los parámetros de la ruta (post)
import { format } from 'date-fns';  // Importa la librería para formatear la fecha
import { es } from 'date-fns/locale'; // Importa la configuración regional en español

// Para fuentes
import { useFonts, AsapCondensed_400Regular } from '@expo-google-fonts/asap-condensed';

export function HomeScreen() {
  const [posts, setPosts] = useState([]); // Asegúrate de que sea un array vacío por defecto
  const [users, setUsers] = useState([]); // Para almacenar los datos de los usuarios (nick)
  const route = useRoute();
  const newPost = route.params ? route.params.newPost : null; // Recibe la nueva publicación

  // Usamos el useEffect para cargar las publicaciones al cargar la página
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.68.50:8080/proyecto01/publicaciones/obtenerPublicaciones', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        // Ordenar las publicaciones de más reciente a más antigua por 'createdAt'
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts); // Guarda las publicaciones ordenadas en el estado

        // Obtener los nicks de los usuarios asociados a las publicaciones
        const userIds = data.map(post => post.user_id);
        fetchUsers(userIds); // Llamamos a la función para obtener los nicks
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        Alert.alert('Error', 'No se pudieron cargar las publicaciones');
      }
    };

    fetchPosts();
  }, []); // Este useEffect solo corre cuando se monta el componente.

  // Agregar nueva publicación a la lista si existe
  useEffect(() => {
    if (newPost) {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  // Función para obtener los datos de los usuarios (nick)
  const fetchUsers = async (userIds) => {
    try {
      const responses = await Promise.all(
        userIds.map(id =>
          fetch(`http://192.168.68.50:8080/proyecto01/usuarios/${id}`)
        )
      );
      const usersData = await Promise.all(responses.map(res => res.json()));
      setUsers(usersData); // Guardar los usuarios con los nicks
    } catch (error) {
      console.error('Error al obtener los datos de los usuarios:', error);
    }
  };

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

  const renderItem = ({ item }) => {
    const user = users.find(user => user.id === item.user_id); // Buscar el usuario por user_id
    const userNick = user ? user.nick : 'Desconocido'; // Obtener el nick del usuario

    return (
      <View style={styles.postContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBox}>
            <Text style={styles.imageText}>Imagen</Text>
          </View>
        </View>
        <Text style={styles.postTitle}>{item.titulo}</Text>
        <Text style={styles.postDate}>{item.createdAt ? formatDate(item.createdAt) : 'Fecha no disponible'}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <Text style={styles.postUser}>Publicado por: {userNick}</Text> {/* Muestra el nick del usuario */}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.contenedorCabecera}>
      <Image source={require('../../../assets/images/ic_logo_2.png')} style={styles.logotipo} />
      <View style={styles.textoCabecera}>
        <Text style={styles.nickName}>Nick</Text>
        <Text style={styles.textoCabeceraVedruna}>VEDRUNA</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts} // Solo las publicaciones
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader} // Esto añade la cabecera fija
      ListHeaderComponentStyle={styles.header} // Estilo opcional para la cabecera
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
  imageBox: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#A0FF4B',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#A0FF4B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  postUser: {
    fontSize: 12,
    color: '#A0FF4B',
    marginTop: 5,
  },
});
