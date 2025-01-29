// Importación de mongoose, que es una librería para interactuar con MongoDB en Node.js.
import mongoose from "mongoose";

// Importación del modelo 'Post' desde el archivo de modelos, para trabajar con las publicaciones en la base de datos.
import Post from "./models/Post";

// Función para conectar a MongoDB
const conexion = async() => {
    try {
        // URI de conexión con MongoDB. Asegúrate de tener los datos correctos de tu base de datos.
        const uri = 'mongodb+srv://root:root@proyectovedruna.bk0oy.mongodb.net/AppVedruna?retryWrites=true&w=majority&appName=ProyectoVedruna';
        
        // Conexión a MongoDB utilizando Mongoose. Se pasan opciones para el parser y la topología.
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexion exitosa'); // Si la conexión es exitosa, se imprime este mensaje.
    } catch(error) {
        // Si ocurre un error en la conexión, se imprime el error y el proceso se detiene con 'process.exit(1)'.
        console.log('Error al conectar con Mongodb:', error);
        process.exit(1);  // Finaliza el proceso con un código de error 1
    }
}

// Función para guardar una publicación en la base de datos
const guardarPublicacion = async(datosPublicacion) => {
    // Extraemos los datos de la publicación (título, descripción y URL de la imagen).
    const { title, description, imageUrl } = datosPublicacion;
    
    // Creamos una nueva instancia del modelo Post, pasando los datos extraídos a su constructor.
    const publicacion = new Post({ 
        title,        // Título de la publicación.
        description,  // Descripción de la publicación.
        imageUrl      // URL de la imagen asociada a la publicación.
    });

    try {
        // Guardamos la nueva publicación en la base de datos.
        await publicacion.save();
        console.log('Se ha registrado y guardado exitosamente la publicacion en mongo');  // Si se guarda con éxito, se imprime este mensaje.
    } catch(error) {
        // Si ocurre un error durante la operación de guardar, se imprime el error.
        console.log('Error al guardar y registrar la publicacion:', error);
    }
};

// Exportamos las funciones para que puedan ser utilizadas en otros archivos.
export { conexion, guardarPublicacion };
