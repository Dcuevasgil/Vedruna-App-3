package es.vedruna.appVedruna.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "comentarios")
@Data // Lombok genera los getters, setters, toString, etc.
@NoArgsConstructor // Lombok genera el constructor sin argumentos
@AllArgsConstructor // Lombok genera el constructor con todos los argumentos
public class Comentario {

    @MongoId
    private String id;
    private String user_id;
    private String idPublicacion;
    private String comentario;
}
