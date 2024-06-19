package br.edu.utfpr.pb.tads.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoDTO {

    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private CategoriaDTO categoria;
    private String urlImagem;
}