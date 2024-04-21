package br.edu.utfpr.pb.tads.server.dto;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PedidoDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "A data e hora do pedido não devem ser nulas.")
    @Column(nullable = false)
    private LocalDateTime dataHora;

    @NotNull(message = "O valor total do pedido não deve ser nulo.")
    private BigDecimal valorTotal;
}
