package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.repository.IProdutoRepository;
import br.edu.utfpr.pb.tads.server.model.Produto;
import br.edu.utfpr.pb.tads.server.service.IProdutoService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProdutoServiceImpl extends CrudServiceImpl<Produto, Long>
        implements IProdutoService {

    private final IProdutoRepository IProdutoRepository;

    public ProdutoServiceImpl(IProdutoRepository IProdutoRepository) {
        this.IProdutoRepository = IProdutoRepository;
    }

    @Override
    protected JpaRepository<Produto, Long> getRepository() {
        return IProdutoRepository;
    }
}