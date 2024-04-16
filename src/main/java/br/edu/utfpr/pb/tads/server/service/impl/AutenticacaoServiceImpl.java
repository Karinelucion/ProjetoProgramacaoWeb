package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import br.edu.utfpr.pb.tads.server.service.IUsuarioService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoServiceImpl extends CrudServiceImpl<Usuario, Long> implements UserDetailsService, IUsuarioService {

    private final IUsuarioRepository usuarioRepository;

    public AutenticacaoServiceImpl(IUsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByNomeUsuario(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario nao encontrado");
        }
        return usuario;
    }

    @Override
    protected JpaRepository<Usuario, Long> getRepository() {
        return usuarioRepository;
    }
}
