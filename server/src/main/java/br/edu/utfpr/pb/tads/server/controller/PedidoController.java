package br.edu.utfpr.pb.tads.server.controller;

import br.edu.utfpr.pb.tads.server.dto.PedidoDTO;
import br.edu.utfpr.pb.tads.server.dto.ProdutosPedidoDTO;
import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.ProdutosPedido;
import br.edu.utfpr.pb.tads.server.service.ICrudService;
import br.edu.utfpr.pb.tads.server.service.impl.PedidoServiceImpl;
import br.edu.utfpr.pb.tads.server.service.impl.ProdutosPedidoServiceImpl;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("pedidos")
public class PedidoController extends CrudController<Pedido, PedidoDTO, Long> {

    private static PedidoServiceImpl pedidoService;
    private static ProdutosPedidoServiceImpl produtosPedidoService;

    private static ModelMapper modelMapper;

    public PedidoController(PedidoServiceImpl pedidoService, ModelMapper modelMapper, ProdutosPedidoServiceImpl produtosPedidoService) {
        super(Pedido.class, PedidoDTO.class);

        PedidoController.pedidoService = pedidoService;
        PedidoController.produtosPedidoService = produtosPedidoService;
        PedidoController.modelMapper = modelMapper;
    }

    @GetMapping("/meuspedidos")
    public ResponseEntity< List<PedidoDTO> > getPedidosPorUsuario() {
        return ResponseEntity.ok(
                pedidoService.buscarPedidosUsuario()
                        .stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toList()));
    }

    @PostMapping("/salvar")
    public ResponseEntity<?> salvarPedidoComProdutos(@Valid @RequestBody PedidoDTO pedidoDTO){

        // Coleta a lista de produtos do Pedido e à esvazia no DTO para gravar o Pedido individualmente
        List<ProdutosPedidoDTO> produtosPedidosDTO = pedidoDTO.getProdutosPedido();
        pedidoDTO.setProdutosPedido(new ArrayList<>());

        Pedido pedido = pedidoService.save(convertToEntity(pedidoDTO), produtosPedidosDTO);

        // Grava os produtos do pedido
        List<ProdutosPedido> produtosPedidos = produtosPedidoService.save(produtosPedidosDTO, pedido);

        if (pedido == null || produtosPedidos == null || produtosPedidos.isEmpty()) {
            return ResponseEntity.badRequest().body("Erro ao criar pedido.");
        }

        // Atualiza o pedidoDTO com os dados tratados para retornar na request
        pedidoDTO.setId(pedido.getId());
        pedidoDTO.setValorTotal(pedido.getValorTotal());
        pedidoDTO.setProdutosPedido(produtosPedidosDTO);
        return ResponseEntity.ok(pedidoDTO);
    }

    @Override
    protected ICrudService<Pedido, Long> getService() {
        return pedidoService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
