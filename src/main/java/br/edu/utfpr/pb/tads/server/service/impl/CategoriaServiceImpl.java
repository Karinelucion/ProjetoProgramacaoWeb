package br.edu.utfpr.pb.tads.server.service.impl;


import br.edu.utfpr.pb.tads.server.service.ICategoriaService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends CrudServiceImpl<Categoria, Long>
        implements ICategoriaService {

    private final CategoriaRepository categoryRepository;

    public CategoryServiceImpl(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    protected JpaRepository<Categoria, Long> getRepository() {
        return categoriaRepository;
    }
}