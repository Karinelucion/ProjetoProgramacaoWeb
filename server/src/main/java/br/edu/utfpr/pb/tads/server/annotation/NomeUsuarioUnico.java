package br.edu.utfpr.pb.tads.server.annotation;

import br.edu.utfpr.pb.tads.server.validation.NomeUsuarioUnicoValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = NomeUsuarioUnicoValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface NomeUsuarioUnico {
    String message() default "Este nome de usuário já está em uso. Por favor, tente outro.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
