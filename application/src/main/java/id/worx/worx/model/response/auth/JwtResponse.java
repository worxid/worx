package id.worx.worx.model.response.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {
    private String accessToken;
    @Builder.Default
    private String type = "Bearer";
    private String refreshToken;
    private String email;
}
