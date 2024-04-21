package br.edu.utfpr.pb.tads.server;

import br.edu.utfpr.pb.tads.server.error.ApiError;
import br.edu.utfpr.pb.tads.server.model.Pedido;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles({"test"})
public class UsuarioControllerTest {
    private final String API_USUARIO = "/usuario";
    @Autowired
    private TestRestTemplate testRestTemplate;
    @Autowired
    private IUsuarioRepository usuarioRepository;

    public UsuarioControllerTest() {
    }

    @BeforeEach
    public void cleanup() {
        this.usuarioRepository.deleteAll();
        this.testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void cadastraUsuario_quandoUsuarioEhValido_retornaOK(){
        Usuario usuario = Usuario.builder().nomeUsuario("karine").nomeExibicao("Karine").senha("Karine@1234567").build();

        ResponseEntity<Object> response = this.testRestTemplate.postForEntity("/usuario", usuario, Object.class, new Object[0]);
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void cadastraUsuario_quandoSenhaehInvalida_retornaBadRequest(){
        Usuario usuario = Usuario.builder().nomeUsuario("karine").nomeExibicao("Karine").senha("123456789").build();

        ResponseEntity<Object> response = this.testRestTemplate.postForEntity("/usuario", usuario, Object.class, new Object[0]);
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

    }


}
