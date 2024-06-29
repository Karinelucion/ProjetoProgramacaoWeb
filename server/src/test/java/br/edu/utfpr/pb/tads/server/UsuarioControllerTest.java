package br.edu.utfpr.pb.tads.server;


import br.edu.utfpr.pb.tads.server.error.ApiError;
import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import br.edu.utfpr.pb.tads.server.shared.GenericResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {

    private final String API_USERS = "/usuario";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private IUsuarioRepository userRepository;

    @BeforeEach
    public void cleanup(){
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void cadastraUsuario_quandoUsuarioEhValido_retornaOk(){
        ResponseEntity<Object> response = testRestTemplate.postForEntity(API_USERS, createValidUser(),
                Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioEhValido_usuarioEhSalvoNoBancoDeDados(){

        ResponseEntity<Object> response = testRestTemplate.postForEntity(API_USERS, createValidUser(),
                Object.class);

        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioEhValido_retornaMensagemDeSucesso(){
        ResponseEntity<GenericResponse> response =
                testRestTemplate.postForEntity(API_USERS, createValidUser(),
                        GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }

    @Test
    public void cadastraUsuario_quandoUsuarioEhValido_senhaEstaCriptografadaNoBancoDeDados(){
        Usuario user = createValidUser();
        testRestTemplate.postForEntity(API_USERS,
                user,
                Object.class);

        List<Usuario> userList = userRepository.findAll();
        assertThat(userList.get(0).getPassword()).isNotEqualTo(user.getPassword());
    }

    @Test
    public void cadastraUsuario_quandoUsuarioPossuiNomeUsuarioNull_retornaBadRequest(){
        Usuario user = createValidUser();
        user.setNomeUsuario(null);
        ResponseEntity<Object> response =
                testRestTemplate.postForEntity(API_USERS, user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioPossuiNomeExibicaoNull_retornaBadRequest(){
        Usuario user = createValidUser();
        user.setNomeExibicao(null);
        ResponseEntity<Object> response =
                testRestTemplate.postForEntity(API_USERS, user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioPossuiSenhaNull_retornaBadRequest(){
        Usuario user = createValidUser();
        user.setSenha(null);
        ResponseEntity<Object> response =
                testRestTemplate.postForEntity(API_USERS, user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioPossuiNomeUsuarioMenorQueORequerido_retornaBadRequest(){
        Usuario user = createValidUser();
        user.setNomeUsuario("abc");

        ResponseEntity<Object> response =
                testRestTemplate.postForEntity(API_USERS, user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioPossuiNomeUsuarioMaiorQueOTamanhoLimite_retornaBadRequest(){
        Usuario user = createValidUser();
        String usernameWith256Chars = IntStream.range(1, 257)
                .mapToObj(x -> "a").collect(Collectors.joining());
        user.setNomeUsuario(usernameWith256Chars);

        ResponseEntity<Object> response =
                testRestTemplate.postForEntity(API_USERS, user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void cadastraUsuario_quandoOUsuarioPossuiTodosOsCaracteresDaSenhaMinusculos_retornaBadRequest(){
        Usuario user = createValidUser();
        user.setSenha("password");

        ResponseEntity<Object> response =
                testRestTemplate.postForEntity(API_USERS, user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioEhInvalido_retornaApiError() {
        ResponseEntity<ApiError> response =
                testRestTemplate.postForEntity(API_USERS, new Usuario(), ApiError.class);

        assertThat(response.getBody().getUrl()).isEqualTo(API_USERS);
    }

    @Test
    public void cadastraUsuario_quandoUsuarioEhInvalido_retornaApiErrorComValidationErrors() {
        ResponseEntity<ApiError> response =
                testRestTemplate.postForEntity(API_USERS, new Usuario(), ApiError.class);

        assertThat(response.getBody().getValidationErrors().size()).isEqualTo(3);

    }

    @Test
    public void cadastraUsuario_quandoNomeUsuarioJaexiste_retonaBadRequest(){
        Usuario usuario = createValidUser();
        ResponseEntity<Object> response = this.testRestTemplate.postForEntity(API_USERS, usuario, Object.class, new Object[0]);
        usuario = Usuario.builder()
                .nomeUsuario("teste-user")
                .nomeExibicao("teste-Display2")
                .senha("P4assword2").build();

        response = this.testRestTemplate.postForEntity(API_USERS, usuario, Object.class, new Object[0]);
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void cadastraUsuario_quandoSenhaEhInvalida_retornaBadRequest(){
        Usuario usuario = Usuario.builder().nomeUsuario("karine").nomeExibicao("Karine").senha("123456789").build();

        ResponseEntity<Object> response = this.testRestTemplate.postForEntity(API_USERS, usuario, Object.class, new Object[0]);
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

    }

    private Usuario createValidUser() {
        return Usuario.builder()
                .nomeUsuario("teste-user")
                .nomeExibicao("teste-Display")
                .senha("P4assword").build();
    }

}
