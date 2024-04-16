package br.edu.utfpr.pb.tads.server.service.impl;


import br.edu.utfpr.pb.tads.server.model.Categoria;
import br.edu.utfpr.pb.tads.server.repository.CategoriaRepository;
import br.edu.utfpr.pb.tads.server.service.ICategoriaService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


@Service
public class CategoriaServiceImpl extends CrudServiceImpl<Categoria, Long>
        implements ICategoriaService{

    private final CategoriaRepository categoriaRepository;

    public CategoriaServiceImpl(CategoriaRepository categoryRepository) {
        this.categoriaRepository = categoryRepository;
    }

    @Override
    protected JpaRepository<Categoria, Long> getRepository() {
        return categoriaRepository;
    }
}