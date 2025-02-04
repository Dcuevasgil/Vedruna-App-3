import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../database/firebase';
import usuarios_registrados from '../database/models/UsuarioRegistrado';

export const registrarUsuario = async (email, password, nombre, apellidos, nick) => {
    try {
        // Verificar si el correo ya está registrado en Firebase
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
            throw new Error('El correo electrónico ya está registrado.');
        }

        // Registro del usuario en Firebase
        const credencialesDeUsuario = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario creado con éxito en Firebase.');

        // Obtener el ID de Firebase del nuevo usuario
        const firebase_id = credencialesDeUsuario.user.uid;

        // Crear un objeto de usuario en MongoDB
        const nuevo_usuario = new usuarios_registrados({
            firebase_id: firebase_id,
            nick: nick,
            nombre: nombre,
            apellidos: apellidos,
        });

        // Guardar el nuevo usuario en MongoDB
        await nuevo_usuario.save();
        console.log('Usuario guardado correctamente en MongoDB.');

        // Devolver el nuevo usuario
        return nuevo_usuario;

    } catch (error) {
        // Mostrar el error de registro
        console.error('Error al registrar el usuario:', error.message);
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('El correo electrónico ya está registrado.');
        }
        throw new Error(`Hubo un problema al registrar el usuario: ${error.message}`);
    }
};
