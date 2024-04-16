package br.edu.utfpr.pb.tads.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "tb_pedido")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "A data e hora do pedido não devem ser nulas.")
    @Column(nullable = false)
    private LocalDateTime dataHora;

    @NotNull(message = "O usuário do pedido não deve ser nulo")
    @ManyToOne
    @Column(nullable = false)
    @JoinColumn(name = "usuarioid", referencedColumnName = "id")
    private Usuario usuario;
}
