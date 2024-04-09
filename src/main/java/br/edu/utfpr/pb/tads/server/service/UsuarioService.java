package br.edu.utfpr.pb.tads.server.service;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final IUsuarioRepository usuarioRepositoryory;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UsuarioService(IUsuarioRepository usuarioRepositoryory) {
        this.usuarioRepositoryory = usuarioRepositoryory;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public Usuario salvar(Usuario usuario) {
        usuario.setSenha( bCryptPasswordEncoder.encode(usuario.getSenha()));
        return usuarioRepositoryory.save(usuario);
    }
}
