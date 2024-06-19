package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.repository.IProdutoRepository;
import br.edu.utfpr.pb.tads.server.model.Produto;
import br.edu.utfpr.pb.tads.server.service.IProdutoService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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


    public List<Produto> buscarPorCategoria(Long categoriaId){
        List<Produto> todosProdutos = getRepository().findAll();

        List<Produto> produtosPorCategoria = todosProdutos.stream()
                .filter(produto -> produto.getCategoria().getId().equals(categoriaId))
                .collect(Collectors.toList());

        return produtosPorCategoria;
    }
}