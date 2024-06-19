package br.edu.utfpr.pb.tads.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "tb_produto")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @NotNull
    @Getter @Setter
    private String nome;

    @NotNull
    @Column(columnDefinition = "TEXT")
    @Getter @Setter
    private String descricao;

    @NotNull
    @Getter @Setter
    private BigDecimal preco;

    @NotNull
    @Getter @Setter
    @Column(columnDefinition = "TEXT")
    private String urlImagem;

    @ManyToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    @Getter @Setter
    private Categoria categoria;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Produto produto = (Produto) o;
        return Objects.equals(id, produto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}