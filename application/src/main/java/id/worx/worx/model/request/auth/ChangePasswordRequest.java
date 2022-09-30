package id.worx.worx.model.request.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {
    @NotBlank
    @JsonProperty("old_password")
    private String oldPassword;
    @NotBlank
    @JsonProperty("new_password")
    private String newPassword;
    @NotBlank
    private String email;
}
