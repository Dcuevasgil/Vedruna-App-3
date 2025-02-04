// Importa mongoose para usar las funcionalidades de MongoDB en Node.js
import mongoose from 'mongoose'

// Define el esquema (estructura) del modelo 'Post' en MongoDB
const postSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },  // Asegúrate de que description esté aquí
    image_url: { type: String, required: true },
}, { timestamps: true });
  
const Post = mongoose.model('Post', postSchema);

// Exporta el modelo 'Post' para que pueda ser usado en otras partes de la aplicación
export default Post;