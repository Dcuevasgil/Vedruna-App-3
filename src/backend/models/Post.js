// Importa mongoose para usar las funcionalidades de MongoDB en Node.js
import mongoose from 'mongoose'

// Define el esquema (estructura) del modelo 'Post' en MongoDB
const postSchema = new mongoose.Schema({
    // Definición del campo 'title' como tipo String y obligatorio
    title: { type: String, required: true },
    
    // Definición del campo 'description' como tipo String y obligatorio
    description: { type: String, required: true },
    
    // Definición del campo 'imageUrl' como tipo String y obligatorio
    imageUrl: { type: String, required: true },
}, { timestamps: true });  // 'timestamps: true' agrega automáticamente los campos 'createdAt' y 'updatedAt'

// Crea un modelo de Mongoose llamado 'Post' a partir del esquema definido
const Post = mongoose.model('Post', postSchema);

// Exporta el modelo 'Post' para que pueda ser usado en otras partes de la aplicación
export default Post;