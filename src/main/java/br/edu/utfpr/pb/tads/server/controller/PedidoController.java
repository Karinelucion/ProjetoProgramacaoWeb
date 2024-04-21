package br.edu.utfpr.pb.tads.server.controller;

import br.edu.utfpr.pb.tads.server.dto.PedidoDTO;
import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.service.ICrudService;
import br.edu.utfpr.pb.tads.server.service.IPedidoService;
import br.edu.utfpr.pb.tads.server.service.impl.PedidoServiceImpl;
import br.edu.utfpr.pb.tads.server.shared.GenericResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("pedidos")
public class PedidoController extends CrudController<Pedido, PedidoDTO, Long> {

    private static PedidoServiceImpl pedidoService;

    private static ModelMapper modelMapper;

    public PedidoController(PedidoServiceImpl pedidoService, ModelMapper modelMapper) {
        super(Pedido.class, PedidoDTO.class);

        PedidoController.pedidoService = pedidoService;
        PedidoController.modelMapper = modelMapper;

    }

    @GetMapping("/meuspedidos")
    public ResponseEntity< List<PedidoDTO> > getPedidosPorUsuario() {
        pedidoService.buscarPedidosUsuario();
        return ResponseEntity.ok(
                pedidoService.buscarPedidosUsuario().stream().map(this::convertToDto).collect(Collectors.toList()));
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
