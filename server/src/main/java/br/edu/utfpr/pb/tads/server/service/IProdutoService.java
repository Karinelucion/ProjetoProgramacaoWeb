package br.edu.utfpr.pb.tads.server.service;

import br.edu.utfpr.pb.tads.server.model.Produto;

import java.util.List;

public interface IProdutoService extends ICrudService<Produto, Long> {

    List<Produto> buscarPorCategoria(Long categoriaId);
}