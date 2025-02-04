package es.vedruna.appVedruna.services;

import es.vedruna.appVedruna.model.Usuario;

import java.util.List;

public interface UsuarioService {

    public Usuario createUsuario(Usuario usuario);
    public List<Usuario> getAllUsuarios();
    //public List<Usuario> getUser(String name);
}
