package id.worx.worx.common.model.response.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse implements Serializable {
    private String phone;
    private String email;
    private String status;
}
