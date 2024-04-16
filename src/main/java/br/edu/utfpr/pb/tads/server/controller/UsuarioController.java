package br.edu.utfpr.pb.tads.server.controller;

import br.edu.utfpr.pb.tads.server.model.Usuario;
import br.edu.utfpr.pb.tads.server.service.impl.UsuarioServiceImpl;
import br.edu.utfpr.pb.tads.server.shared.GenericResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    private final UsuarioServiceImpl usuarioServiceImpl;

    public UsuarioController(UsuarioServiceImpl usuarioServiceImpl) {
        this.usuarioServiceImpl = usuarioServiceImpl;
    }

    @PostMapping
    public GenericResponse createUser(@Valid @RequestBody Usuario usuario) {
        usuarioServiceImpl.salvar(usuario);
        return GenericResponse.builder().message("Usuário salvo com sucesso").build();
    }
}
