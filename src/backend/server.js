import http from 'http';  // Importación del módulo http para crear un servidor
import { conexion, guardarPublicacion } from './database';  // Importación de las funciones de conexión y guardado de publicación desde 'database'

// Configuracion de la ip local o el nombre del dominio si esta desplegado en la nube
const IP_LOCAL = '0.0.0.0';  // IP local para el servidor
const PUERTO = 3000;  // Puerto en el que el servidor escuchará las solicitudes

const servidor = http.createServer(async (req, res) => {  // Creación del servidor HTTP que responderá a las solicitudes
    // Me aseguro de que la solicitud sea POST en la ruta "/proyecto01/publicaciones"
    if(req.method === 'POST' && req.url === '/proyecto01/publicaciones') {  // Verificación del método y ruta de la solicitud
        let body = '';  // Variable para almacenar el cuerpo de la solicitud

        // Recibo los datos de la solicitud
        req.on('data', chunk => {
            body += chunk.toString();  // Construye el cuerpo de la solicitud POST con cada fragmento de datos recibido
        });

        req.on('end', async() => {  // Cuando termina de recibir los datos
            try {
                const datosPublicacion = JSON.parse(body);  // Parseo el cuerpo de la solicitud a JSON
                console.log("Datos recibidos del post:", datosPublicacion);  // Log de los datos recibidos

                // Guardo la publicación en mongoDB
                await guardarPublicacion(datosPublicacion);  // Llamada a la función 'guardarPublicacion' para almacenar los datos en MongoDB

                // Envio una respuesta correcta
                res.writeHead(200, { 'Content-Type': 'application/json' });  // Respuesta con código de estado 200 (OK)
                res.end(JSON.stringify({ message: 'Post guardado con exito' }));  // Envio de un mensaje JSON indicando éxito
            } catch (error) {  // Si ocurre un error en el proceso
                // Manejo de errores
                res.writeHead(500, { 'Content-Type': 'application/json' });  // Respuesta con código de estado 500 (Error interno del servidor)
                res.end(JSON.stringify({ message: 'Error al guardar el post', error }));  // Envio de un mensaje JSON con el error
            }
        })
    } else {
        // Si la ruta no es válida, devuelve un error 404
        res.writeHead(404, { 'Content-Type': 'application/json' });  // Respuesta con código de estado 404 (No encontrado)
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));  // Envio de un mensaje JSON indicando que la ruta no fue encontrada
    }
});

// Iniciar el servidor en el puerto y la IP especificados
server.listen(PUERTO, IP_LOCAL, async () => {
    await conexion();  // Conectar a MongoDB antes de iniciar el servidor
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);  // Mensaje en consola indicando que el servidor está corriendo
});
