package br.edu.utfpr.pb.tads.server.controller;


import br.edu.utfpr.pb.tads.server.model.Produto;
import br.edu.utfpr.pb.tads.server.service.IProdutoService;
import br.edu.utfpr.pb.tads.server.service.ICrudService;
import br.edu.utfpr.pb.tads.server.dto.ProdutoDTO;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("produtos")
public class ProdutoController extends CrudController<Produto, ProdutoDTO, Long> {

    private static IProdutoService produtoService;

    private static ModelMapper modelMapper;

    public ProdutoController(IProdutoService produtoService, ModelMapper modelMapper) {
        super(Produto.class, ProdutoDTO.class);

        ProdutoController.produtoService = produtoService;
        ProdutoController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Produto, Long> getService() {
        return produtoService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Produto>> getProdutosPorCategoria(@PathVariable Long categoriaId) {
        List<Produto> produtos = produtoService.buscarPorCategoria(categoriaId);

        if (!produtos.isEmpty()) {
            return ResponseEntity.ok(produtos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}