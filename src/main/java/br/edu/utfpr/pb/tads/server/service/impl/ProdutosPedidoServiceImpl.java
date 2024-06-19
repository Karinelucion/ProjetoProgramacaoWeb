package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.dto.ProdutosPedidoDTO;
import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Produto;
import br.edu.utfpr.pb.tads.server.model.ProdutosPedido;
import br.edu.utfpr.pb.tads.server.repository.IProdutosPedidoRepository;
import br.edu.utfpr.pb.tads.server.service.IProdutosPedidoService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProdutosPedidoServiceImpl extends CrudServiceImpl<ProdutosPedido, Long>
        implements IProdutosPedidoService {
    private final IProdutosPedidoRepository produtosPedidoRepository;

    public ProdutosPedidoServiceImpl(IProdutosPedidoRepository produtosPedidoRepository) {
        this.produtosPedidoRepository = produtosPedidoRepository;
    }

    public List<ProdutosPedido> save(List<ProdutosPedidoDTO> produtosPedidoDTO, Pedido pedido){
        List<ProdutosPedido> produtosPedidos = new ArrayList<>();

        for (ProdutosPedidoDTO produtoPedidoDTO : produtosPedidoDTO){

            // Converte o produtoPedidoDTO para entidade
            ProdutosPedido produtoPedido = produtoPedidoDTO.convertToEntity();
            produtosPedidos.add(produtoPedido);

            // Seta o pedido e grava os produtos do pedido.
            produtoPedido.setPedido(pedido);
            produtosPedidoRepository.save(produtoPedido);
        }
        return produtosPedidos;
    }


    @Override
    protected JpaRepository<ProdutosPedido, Long> getRepository() {
        return produtosPedidoRepository;
    }
}
