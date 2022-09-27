package id.worx.worx.model.request.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordToken {
    @NotBlank
    private String newPassword;
    @NotBlank
    private String email;
    @NotBlank
    private String token;
}
