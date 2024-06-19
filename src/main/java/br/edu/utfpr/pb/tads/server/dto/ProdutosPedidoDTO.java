package br.edu.utfpr.pb.tads.server.dto;

import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Produto;
import br.edu.utfpr.pb.tads.server.model.ProdutosPedido;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class ProdutosPedidoDTO {

    @JsonIgnore
    private PedidoDTO pedido;
    private ProdutoDTO produto;
    private Integer quantidade;

    public ProdutosPedido convertToEntity(){
        return new ModelMapper().map(this, ProdutosPedido.class);
    }
}
