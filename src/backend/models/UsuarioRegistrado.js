// Importa la librería mongoose, que se usa para interactuar con MongoDB desde Node.js.
import mongoose from 'mongoose';

// Se define el esquema para el modelo 'Usuario', utilizando mongoose.Schema.
// Este esquema determina la estructura y reglas de validación para los documentos 'Usuario' en MongoDB.
const esquemaUsuarioMongo = new mongoose.Schema({
    // 'firebase_id': Un campo para almacenar el ID único del usuario en Firebase, obligatorio y único.
    firebase_id: {
        type: String, 
        required: true,  // Este campo es obligatorio.
        unique: true,    // Debe ser único, es decir, no puede haber dos usuarios con el mismo 'firebase_id'.
    }, 
    
    // 'nick': Un campo para almacenar el nombre de usuario (nick), obligatorio.
    nick: {
        type: String, 
        required: true,  // Este campo también es obligatorio.
    },

    // 'nombre': Un campo para almacenar el nombre real del usuario, obligatorio y único.
    nombre: {
        type: String, 
        required: true,  // Este campo es obligatorio.
        unique: true,    // El nombre debe ser único.
    },

    // 'apellidos': Un campo para almacenar los apellidos del usuario, obligatorio.
    apellidos: {
        type: String, 
        required: true,  // Este campo es obligatorio.
    },

    // 'fecha_registro': Fecha de registro del usuario. Si no se proporciona, se asigna la fecha y hora actual como valor por defecto.
    fecha_registro: {
        type: Date, 
        default: Date.now()  // El valor por defecto es la fecha y hora actual cuando se crea el documento.
    },

    // 'ultimo_inicio_sesion': La fecha del último inicio de sesión del usuario. Por defecto, se asigna la fecha actual.
    ultimo_inicio_sesion: {
        type: Date, 
        default: Date.now()  // El valor por defecto es la fecha y hora actual del último inicio de sesión.
    },

    // 'comentarios': El número de comentarios hechos por el usuario. Inicialmente se establece en 0.
    comentarios: {
        type: Number, 
        default: 0,  // El valor por defecto es 0, ya que el usuario no tiene comentarios inicialmente.
    }
});

// Se crea un modelo de mongoose utilizando el esquema definido anteriormente. 
// El modelo se llama 'Usuario' y se relaciona con la colección en MongoDB donde se almacenarán los usuarios.
const usuarios_registrados = mongoose.model('Usuario', esquemaUsuarioMongo);

// Se exporta el modelo para que pueda ser utilizado en otras partes de la aplicación.
export { usuarios_registrados };
