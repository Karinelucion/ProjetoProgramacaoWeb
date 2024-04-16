package br.edu.utfpr.pb.tads.server.security;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.service.impl.AutenticacaoServiceImpl;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Date;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final AutenticacaoServiceImpl autenticacaoServiceImpl;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, AutenticacaoServiceImpl autenticacaoServiceImpl) {
        this.authenticationManager = authenticationManager;
        this.autenticacaoServiceImpl = autenticacaoServiceImpl;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            // {usuarioname: "admin@admin.com", password: "P4ssword"}
            Usuario credenciais = new ObjectMapper()
                    .readValue(request.getInputStream(), Usuario.class);

            Usuario usuario = (Usuario) autenticacaoServiceImpl.loadUserByUsername(
                    credenciais.getNomeUsuario());

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credenciais.getNomeUsuario(),
                            credenciais.getSenha(),
                            usuario.getAuthorities()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException, ServletException {

        String token = JWT.create()
                .withSubject(authResult.getName())
                .withExpiresAt(new Date(System.currentTimeMillis()
                        + SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET));
        response.setContentType("application/json");
        // {token : "123.456.789"}
        response.getWriter().write(
                new ObjectMapper().writeValueAsString(
                        new AuthenticationResponseDTO(token)
                )
        );
    }
}
