package br.edu.utfpr.pb.tads.server.repository;

import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.ProdutosPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProdutosPedidoRepository extends JpaRepository<ProdutosPedido, Long> {
    List<ProdutosPedido> findByPedido(Pedido pedido);
}
