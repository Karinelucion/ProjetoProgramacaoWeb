package br.edu.utfpr.pb.tads.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoriaDTO {
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String nome;
}
