package es.vedruna.appVedruna.services;

import es.vedruna.appVedruna.model.Comentario;
import es.vedruna.appVedruna.model.Publicacion;

import java.util.List;
import java.util.Optional;

public interface PublicacionService {
    List<Publicacion> getAllPublicaciones();
    Publicacion createPublicacion(Publicacion publicacion);
    Publicacion updateLike(String id_publicacion, String id_user);
    Optional<Publicacion> getById (String id_publicacion);
}
