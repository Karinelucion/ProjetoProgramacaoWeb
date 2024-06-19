package br.edu.utfpr.pb.tads.server.dto;

import br.edu.utfpr.pb.tads.server.model.ProdutosPedido;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PedidoDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "A data e hora do pedido não devem ser nulas.")
    @Column(nullable = false)
    private LocalDateTime dataHora;

    private BigDecimal valorTotal;

    @NotNull(message = "Um pedido precisa ter ao menos um produto.")
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProdutosPedidoDTO> produtosPedido = new ArrayList<>();

}
