package br.edu.utfpr.pb.tads.server.validation;

import br.edu.utfpr.pb.tads.server.annotation.NomeUsuarioUnico;
import br.edu.utfpr.pb.tads.server.repository.IUsuarioRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class NomeUsuarioUnicoValidator implements ConstraintValidator<NomeUsuarioUnico, String> {

    @Autowired
    IUsuarioRepository usuarioRepository;

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (usuarioRepository.findByUsername(s) == null) {
            return true;
        }
        return false;
    }
}
