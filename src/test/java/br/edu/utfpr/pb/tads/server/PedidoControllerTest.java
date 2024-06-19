package br.edu.utfpr.pb.tads.server;


import br.edu.utfpr.pb.tads.server.error.ApiError;
import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IPedidoRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles({"test"})
public class PedidoControllerTest {
    private final String API_PEDIDO = "/pedidos";
    @Autowired
    private TestRestTemplate testRestTemplate;
    @Autowired
    private IPedidoRepository pedidoRepository;

    public PedidoControllerTest() {
    }

    @Test
    public void cadastraPedido_quandoUsuarioNaoEstaAutorizado_retorna401()
    {
        ResponseEntity<ApiError> response = this.testRestTemplate.postForEntity("/pedidos", new Pedido(), ApiError.class);
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }
}
