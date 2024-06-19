package br.edu.utfpr.pb.tads.server.security;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.service.impl.AutenticacaoServiceImpl;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private final AutenticacaoServiceImpl autenticacaoServiceImpl;
    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, AutenticacaoServiceImpl autenticacaoServiceImpl) {
        super(authenticationManager);
        this.autenticacaoServiceImpl = autenticacaoServiceImpl;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String header = request.getHeader(SecurityConstants.HEADER_STRING);

        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)){
            chain.doFilter(request, response);
            return;
        }

        SecurityContextHolder.getContext().setAuthentication(getAuthentication(request));

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request){
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        String username = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET))
                .build()
                .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                .getSubject();

        if (username != null){
            Usuario usuario = (Usuario) autenticacaoServiceImpl.loadUserByUsername(username);

            return new UsernamePasswordAuthenticationToken(usuario.getNomeUsuario(), null, usuario.getAuthorities());
        }

        return null;
    }

}
