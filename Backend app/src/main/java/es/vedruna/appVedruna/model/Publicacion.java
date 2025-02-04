package es.vedruna.appVedruna.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Document(collection = "publicaciones")
public class Publicacion {
    @MongoId
    private String id;
    private String user_id;
    private String image_url;
    private String titulo;
    private String description;  // Cambiar a 'description'
    private List<Comentario> comentario = new LinkedList<>();
    private List <String> like = new LinkedList<>();
    private Date createdAt = new Date();



    public Publicacion(String id, String user_id, String image_url, String titulo, String description, List<Comentario> comentario, List<String> like, Date createdAt) {
        this.id = id;
        this.user_id = user_id;
        this.image_url = image_url;
        this.titulo = titulo;
        this.description = description;
        this.comentario = comentario;
        this.like = like;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return description;
    }

    public void setDescripcion(String description) {
        this.description = description;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public List<Comentario> getComentario() {
        return comentario;
    }

    public void setComentario(List<Comentario> comentario) {
        this.comentario = comentario;
    }

    public List<String> getLike() {
        return like;
    }

    public void setLike(List<String> like) {
        this.like = like;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
