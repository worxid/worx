package id.worx.worx.model.response.users;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long userId;
    private String username;
    private String phone;
    private String email;
    private String status;
}
