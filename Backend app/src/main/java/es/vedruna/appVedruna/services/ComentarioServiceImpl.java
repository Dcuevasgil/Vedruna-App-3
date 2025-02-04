package es.vedruna.appVedruna.services;

import es.vedruna.appVedruna.model.Comentario;
import es.vedruna.appVedruna.repository.ComentariosRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class ComentarioServiceImpl implements ComentarioService{

    @Autowired
    private ComentariosRepository comentariosRepository;

    @Override
    public Comentario crearComentario(Comentario comentario) {
        return comentariosRepository.save(comentario);
    }

    @Override
    public List<Comentario> getAllComentarios(String id_publicacion) {
        return comentariosRepository.findAllByIdPublicacion(id_publicacion);
    }
}
