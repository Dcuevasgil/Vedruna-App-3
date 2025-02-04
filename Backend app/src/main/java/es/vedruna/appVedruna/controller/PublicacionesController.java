package es.vedruna.appVedruna.controller;


import es.vedruna.appVedruna.model.Comentario;
import es.vedruna.appVedruna.model.Publicacion;
import es.vedruna.appVedruna.services.PublicacionServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/proyecto01/publicaciones")
@AllArgsConstructor
public class PublicacionesController {
    @Autowired
    private PublicacionServiceImpl publicacionServiceImpl;

    @PostMapping("/insertarPublicacion")
    public ResponseEntity<Publicacion> insertarPublicacion(
            @RequestParam("user_id") String userId,
            @RequestParam("titulo") String titulo,
            @RequestParam("description") String description,
            @RequestParam("image_url") String imageUrl) {  // Recibir solo la URL de la imagen

        Publicacion publicacion = new Publicacion();
        publicacion.setUser_id(userId);
        publicacion.setTitulo(titulo);
        publicacion.setDescripcion(description);
        publicacion.setImage_url(imageUrl);  // Establecer la URL de la imagen

        // Establecer la fecha de creación
        publicacion.setCreatedAt(new Date());

        // Guardar la nueva publicación
        Publicacion nuevaPublicacion = publicacionServiceImpl.createPublicacion(publicacion);

        return new ResponseEntity<>(nuevaPublicacion, HttpStatus.CREATED);
    }

    @PutMapping("/put/{id}/{id_user}")
    public Publicacion updateLike(@PathVariable String id, @PathVariable String id_user){
        return publicacionServiceImpl.updateLike(id, id_user);
    }

    @CrossOrigin(origins = "http://192.168.68.62:8080/proyecto01/publicaciones")
    @GetMapping("/obtenerPublicaciones")
    public List<Publicacion> getAllPublicaciones() {
        System.out.println("Obteniendo publicaciones...");
        List<Publicacion> publicaciones = publicacionServiceImpl.getAllPublicaciones();
        System.out.println("Publicaciones obtenidas: " + publicaciones.size());
        return publicaciones;
    }
}
