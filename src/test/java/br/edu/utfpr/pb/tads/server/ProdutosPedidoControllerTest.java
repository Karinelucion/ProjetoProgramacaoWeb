package br.edu.utfpr.pb.tads.server;


import br.edu.utfpr.pb.tads.server.model.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles({"test"})
public class ProdutosPedidoControllerTest {
    private final String API_PRODUTOSPEDIDO = "/pedidos";
    @Autowired
    private TestRestTemplate testRestTemplate;

    public ProdutosPedidoControllerTest() {
    }

    @Test
    public void cadastraProdutosPedido_quandoQuantidadeEhNull_retornaBadRequest()
    {
        ProdutosPedido produtosPedido = ProdutosPedido.builder().produto(criaProdutoValido()).pedido(criaPedidoValido()).quantidade(null).build();

        ResponseEntity<Object> response = this.testRestTemplate.postForEntity("/pedidos", produtosPedido, Object.class, new Object[0]);
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    private Usuario criaUsuarioValido() {
        return Usuario.builder()
                .nomeUsuario("teste-user")
                .nomeExibicao("teste-Display")
                .senha("P4assword").build();
    }

    private Pedido criaPedidoValido(){
        return Pedido.builder()
                .usuario(criaUsuarioValido())
                .dataHora(LocalDateTime.of(2024, 2, 13, 15, 56))
                .valorTotal(BigDecimal.valueOf(100.00))
                .build();
    }

    private Categoria criaCategoriaValida(){
        return Categoria.builder()
                .nome("Categoria1")
                .build();
    }

    private Produto criaProdutoValido(){
        return Produto.builder()
                .nome("Produto1")
                .descricao("Descrição1")
                .preco(BigDecimal.valueOf(100.00))
                .categoria(criaCategoriaValida())
                .urlImagem("urlDaImagem")
                .build();
    }
}