package br.edu.utfpr.pb.tads.server.dto;

import br.edu.utfpr.pb.tads.server.annotation.NomeUsuarioUnico;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

    private Long id;

    @NotNull
    @Size(min = 4, max = 50)
    private String nomeExibicao;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nomeExibicao = usuario.getNomeExibicao();
    }
}
