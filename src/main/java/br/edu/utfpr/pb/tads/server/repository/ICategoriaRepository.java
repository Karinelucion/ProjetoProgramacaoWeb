package br.edu.utfpr.pb.tads.server.repository;

import br.edu.utfpr.pb.tads.server.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICategoriaRepository extends JpaRepository<Categoria, Long> {

    List<Categoria> findByNomeContaining(String nome);

}