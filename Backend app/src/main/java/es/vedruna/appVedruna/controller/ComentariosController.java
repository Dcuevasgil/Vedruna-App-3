package es.vedruna.appVedruna.controller;

import es.vedruna.appVedruna.model.Comentario;
import es.vedruna.appVedruna.services.ComentarioServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proyecto01/comentarios")
@AllArgsConstructor
public class ComentariosController {

    @Autowired
    private ComentarioServiceImpl comentarioServiceImpl;

    @GetMapping("/{id_publicacion}")
    public List<Comentario> getComentarioById_publicacion(@PathVariable String id_publicacion){
        return comentarioServiceImpl.getAllComentarios(id_publicacion);
    }
    
    @PostMapping("/put")
    public Comentario createComentario(@RequestBody Comentario comentario) {
        return comentarioServiceImpl.crearComentario(comentario);
    }
}
