import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../database/firebase"; 
import UsuarioRegistrado from "../database/models/UsuarioRegistrado"; 


export const iniciar_sesion = async(email, password) => {
    try {
        // Iniciar sesion con Firebase
        const credencialesDelInicioDeSesionUsuario = await signInWithEmailAndPassword(auth, email, password);

        // Obtener el firebase_id (ID de Firebase)
        const firebase_id = credencialesDelInicioDeSesionUsuario.user.uid;

        // Verificar si el usuario ya existe en la base de datos de mongodb
        let usuario_existente = await UsuarioRegistrado.findOne({ firebase_id });

        // Si el usuario no existe en la base de datos de MongoDB, es necesario crearlo
        if(!usuario_existente) {
            // Creacion de un nuevo usuario en MongoDB
            usuario_existente = new UsuariUsuarioRegistrado({
                firebase_id: firebase_id,
                nick: email.split('@')[0], // Uso el email para crear el nick
                // Uso unos valores por defecto si el email no sirve como nick
                nombre: 'Prueba_1', 
                apellidos: 'Ejemplo_prueba_1',
                ultimo_inicio_sesion: Date.now(), // Fecha del primer inicio de sesion del usuario del dia
            });

            await usuario_existente.save();
            console.log('Nuevo usuario creado y guardado');
        } else {
            // Si el usuario ya existe, actualizo el ultimo inicio de sesion diario de ese usuario
            usuario_existente.ultimo_inicio_sesion = Date.now(); // Actualizo el ultimo inicio de sesion con la fecha actual
            await usuario_existente.save();
            console.log('Último inicio de sesion actualizado del usuario')
        }

        return usuario_existente;
    } catch(error) {
        console.log('Error al inciar la sesión del usuario', error);
        throw new Error('Hubo un problema al inicial sesión');
    }
}
