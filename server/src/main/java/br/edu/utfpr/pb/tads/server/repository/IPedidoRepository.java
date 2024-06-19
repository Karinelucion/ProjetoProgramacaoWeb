package br.edu.utfpr.pb.tads.server.repository;

import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuario(Usuario usuario);
}
