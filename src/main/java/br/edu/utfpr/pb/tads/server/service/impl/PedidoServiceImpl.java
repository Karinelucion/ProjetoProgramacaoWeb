package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IPedidoRepository;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import br.edu.utfpr.pb.tads.server.service.IPedidoService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoServiceImpl extends CrudServiceImpl<Pedido, Long> implements IPedidoService {

    private final IPedidoRepository pedidoRepository;
    private final IUsuarioRepository usuarioRepository;

    public List<Pedido> buscarPedidosUsuario (){
        Usuario usuario = getUsuarioAutenticado();

        return pedidoRepository.findByUsuario(usuario);
    }

    public PedidoServiceImpl(IPedidoRepository pedidoRepository, IUsuarioRepository usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Pedido save(Pedido pedido) {
        Usuario usuarioAutenticado = getUsuarioAutenticado();

        pedido.setUsuario(usuarioAutenticado);
        return pedidoRepository.save(pedido);
    }

    @Override
    protected JpaRepository<Pedido, Long> getRepository() {
        return pedidoRepository;
    }

    private Usuario getUsuarioAutenticado(){
        Authentication autenticacao = SecurityContextHolder.getContext().getAuthentication();
        String nomeUsuario = autenticacao.getName();

        return usuarioRepository.findByNomeUsuario(nomeUsuario);
    }
}
