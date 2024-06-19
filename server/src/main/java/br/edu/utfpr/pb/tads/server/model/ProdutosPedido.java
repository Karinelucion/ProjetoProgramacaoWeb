package br.edu.utfpr.pb.tads.server.model;

import br.edu.utfpr.pb.tads.server.dto.ProdutosPedidoDTO;
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
public class ProdutosPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedidoid", referencedColumnName = "id")
    private Pedido pedido;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "produtoid", referencedColumnName = "id")
    private Produto produto;

    @NotNull(message = "A quantidade do produto não pode ser nula.")
    private Integer quantidade;

}
