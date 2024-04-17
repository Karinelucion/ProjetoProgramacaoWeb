package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.model.ProdutosPedido;
import br.edu.utfpr.pb.tads.server.repository.IProdutosPedidoRepository;
import br.edu.utfpr.pb.tads.server.service.IProdutosPedidoService;
import org.springframework.data.jpa.repository.JpaRepository;

public class ProdutosPedidoServiceImpl extends CrudServiceImpl<ProdutosPedido, Long>
        implements IProdutosPedidoService {
    private final IProdutosPedidoRepository produtosPedidoRepository;

    public ProdutosPedidoServiceImpl(IProdutosPedidoRepository produtosPedidoRepository) {
        this.produtosPedidoRepository = produtosPedidoRepository;
    }

    @Override
    protected JpaRepository<ProdutosPedido, Long> getRepository() {
        return produtosPedidoRepository;
    }
}
