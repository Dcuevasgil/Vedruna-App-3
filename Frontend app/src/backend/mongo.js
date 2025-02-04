// Importa mongoose para trabajar con MongoDB en Node.js
import mongoose from 'mongoose';

// Función asíncrona para realizar la conexión a la base de datos MongoDB
const conexionMongoDB = async () => {
    try {
        // Define la URI de conexión a MongoDB, incluyendo el usuario, contraseña y base de datos
        const uri = 'mongodb+srv://root:root@proyectovedruna.bk0oy.mongodb.net/AppVedruna?retryWrites=true&w=majority&appName=ProyectoVedruna'
        
        // Realiza la conexión usando mongoose.connect y pasa la URI y algunas opciones de configuración
        await mongoose.connect(uri, {
            // 'useNewUrlParser' y 'useUnifiedTopology' son configuraciones para manejar nuevas características de MongoDB
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Si la conexión es exitosa, muestra el mensaje correspondiente
        console.log("Conexion a MongoDB exitosa!");
    } catch(error) {
        // Si ocurre un error durante la conexión, muestra el error y termina el proceso
        console.log("Error de conexion a la base de datos de Mongo:", error);
        process.exit(1); // Termina el proceso con un código de salida 1 para indicar un error
    }
}

// Exporta la función para que pueda ser usada en otras partes del proyecto
export default conexionMongoDB;
