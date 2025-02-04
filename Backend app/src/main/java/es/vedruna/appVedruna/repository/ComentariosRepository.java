package es.vedruna.appVedruna.repository;

import es.vedruna.appVedruna.model.Comentario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentariosRepository extends MongoRepository<Comentario, String> {
    List<Comentario> findAllByIdPublicacion(String idPublicacion);
}
