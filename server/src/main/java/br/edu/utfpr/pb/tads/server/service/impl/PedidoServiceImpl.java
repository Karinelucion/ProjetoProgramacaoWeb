package br.edu.utfpr.pb.tads.server.service.impl;

import br.edu.utfpr.pb.tads.server.dto.ProdutosPedidoDTO;
import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IPedidoRepository;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import br.edu.utfpr.pb.tads.server.service.IPedidoService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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


    public Pedido save(Pedido pedido, List<ProdutosPedidoDTO> produtosPedidoDTO) {
        // Busca o usuário autenticado para gravar no pedido.
        Usuario usuarioAutenticado = getUsuarioAutenticado();

        // Calcula o valor total do pedido.
        BigDecimal valorTotal = new BigDecimal(0);

        for (ProdutosPedidoDTO produtoPedido : produtosPedidoDTO){
            BigDecimal valorProduto = produtoPedido.getProduto().getPreco();
            BigDecimal quantidade = BigDecimal.valueOf(produtoPedido.getQuantidade());

            valorTotal = valorTotal.add( valorProduto.multiply(quantidade) ) ;
        }

        pedido.setValorTotal(valorTotal);
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
