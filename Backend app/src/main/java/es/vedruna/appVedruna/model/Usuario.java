package es.vedruna.appVedruna.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "usuarios")
@Data // Lombok genera los getters, setters, toString, etc.
@NoArgsConstructor // Lombok genera el constructor sin argumentos
@AllArgsConstructor // Lombok genera el constructor con todos los argumentos
public class Usuario {

    @MongoId
    private String id;
    private String nick;
    private String user_id;
    private String nombre;
    private String apellidos;
    private String profile_picture;
}
