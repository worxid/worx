package id.worx.worx.model.request.users;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserRequest implements Serializable {
    private String username;
    private String password;
    private String email;
    private String phoneNo;
}
