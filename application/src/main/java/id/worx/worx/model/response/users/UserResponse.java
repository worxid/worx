package id.worx.worx.model.response.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    @JsonProperty("user_id")
    private Long userId;
    private String username;
    private String phone;
    private String email;
    private String status;
}
