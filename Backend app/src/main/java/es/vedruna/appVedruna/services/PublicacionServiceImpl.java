package es.vedruna.appVedruna.services;

import es.vedruna.appVedruna.model.Comentario;
import es.vedruna.appVedruna.model.Publicacion;
import es.vedruna.appVedruna.repository.ComentariosRepository;
import es.vedruna.appVedruna.repository.PuplicacionesRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublicacionServiceImpl implements PublicacionService{

    @Autowired
    private PuplicacionesRepository puplicacionesRepository;

    @Autowired
    private ComentariosRepository comentariosRepository; // Asegúrate de tener este repositorio

    // Obtener todas las publicaciones
    public List<Publicacion> getAllPublicaciones() {
        return puplicacionesRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Publicacion createPublicacion(Publicacion publicacion) {
        System.out.println("Guardando publicación con descripción: " + publicacion.getDescripcion());
        return puplicacionesRepository.save(publicacion);
    }


    @Override
    public Publicacion updateLike(String id_publicacion, String id_user) {
        Optional<Publicacion> publicacionOptional = puplicacionesRepository.findById(id_publicacion);
        
        if(publicacionOptional.isPresent()){
            Publicacion publicacion = publicacionOptional.get();
            // Añadir el id_user a la lista de likes si no está ya presente
            List<String> likes = publicacion.getLike();
            if (!likes.contains(id_user)) { // Evitar duplicados
                likes.add(id_user); // Agregar el id_user a la lista
                publicacion.setLike(likes); // Actualizar la lista de likes en la publicación
            } else {
                likes.remove(id_user); // Agregar el id_user a la lista
                publicacion.setLike(likes); // Actualizar la lista de likes en la publicación   
            }

            return puplicacionesRepository.save(publicacion);
        } else {
            throw new RuntimeException("Publicacion no encontrada");
        }
    }

    @Override
    public Optional<Publicacion> getById(String id_publicacion) {
        return puplicacionesRepository.findById(id_publicacion);
    }

}
