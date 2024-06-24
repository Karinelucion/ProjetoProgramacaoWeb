package br.edu.utfpr.pb.tads.server.security;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponseDTO {
    private String token;
}
