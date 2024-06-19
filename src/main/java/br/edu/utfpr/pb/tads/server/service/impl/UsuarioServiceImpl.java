package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import br.edu.utfpr.pb.tads.server.service.IUsuarioService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl extends CrudServiceImpl<Usuario, Long> implements IUsuarioService {

    private final IUsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UsuarioServiceImpl(IUsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public Usuario salvar(Usuario usuario) {
        usuario.setSenha( bCryptPasswordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    @Override
    protected JpaRepository<Usuario, Long> getRepository() {
        return usuarioRepository;
    }
}
