package br.edu.utfpr.pb.tads.server.service;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    private final IUsuarioRepository usuarioRepository;

    public AutenticacaoService(IUsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario nao encontrado");
        }
        return usuario;
    }
}
