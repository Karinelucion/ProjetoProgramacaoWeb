package br.edu.utfpr.pb.tads.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "tb_itens_pedido")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ItensPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "pedidoid", referencedColumnName = "id")
    private Pedido pedido;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "produtoid", referencedColumnName = "id")
    private Produto produto;
}
