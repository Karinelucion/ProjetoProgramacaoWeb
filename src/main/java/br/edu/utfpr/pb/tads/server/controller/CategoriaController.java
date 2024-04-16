package br.edu.utfpr.pb.tads.server.controller;

import br.edu.utfpr.pb.tads.server.dto.CategoriaDTO;
import br.edu.utfpr.pb.tads.server.model.Categoria;
import br.edu.utfpr.pb.tads.server.service.ICategoriaService;
import br.edu.utfpr.pb.tads.server.service.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("categorias")
public class CategoriaController extends CrudController<Categoria, CategoriaDTO, Long> {

    private static ICategoriaService categoriaService;
    private static ModelMapper modelMapper;

    public CategoriaController(ICategoriaService categoriaService,
                              ModelMapper modelMapper) {
        super(Categoria.class, CategoriaDTO.class);
        CategoriaController.categoriaService = categoriaService;
        CategoriaController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Categoria, Long> getService() {
        return CategoriaController.categoriaService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return CategoriaController.modelMapper;
    }
}