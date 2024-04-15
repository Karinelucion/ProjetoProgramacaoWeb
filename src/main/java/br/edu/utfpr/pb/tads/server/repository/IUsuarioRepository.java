package br.edu.utfpr.pb.tads.server.repository;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByUsername(String username);
}
