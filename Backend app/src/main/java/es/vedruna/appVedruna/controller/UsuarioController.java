package es.vedruna.appVedruna.controller;

import es.vedruna.appVedruna.model.Usuario;
import es.vedruna.appVedruna.services.UsuarioServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proyecto01/users")
@AllArgsConstructor

public class UsuarioController {

    @Autowired
    private UsuarioServiceImpl usuarioServiceImpl;

    // Crear un nuevo usuario
    @PostMapping("/register")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioServiceImpl.createUsuario(usuario);
    }

    // Obtener todos los usuarios
    @GetMapping("/name")
    public List<Usuario> getAllUsuarios() {
        return usuarioServiceImpl.getAllUsuarios();
    }


}
