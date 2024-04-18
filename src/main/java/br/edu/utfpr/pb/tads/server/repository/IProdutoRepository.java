package br.edu.utfpr.pb.tads.server.repository;

import br.edu.utfpr.pb.tads.server.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeContaining(String nome);
}