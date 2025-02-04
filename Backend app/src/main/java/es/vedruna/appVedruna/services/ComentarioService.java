package es.vedruna.appVedruna.services;

import es.vedruna.appVedruna.model.Comentario;

import java.util.List;

public interface ComentarioService {
    Comentario crearComentario(Comentario comentario);
    List<Comentario> getAllComentarios(String id_publicacion);
}
