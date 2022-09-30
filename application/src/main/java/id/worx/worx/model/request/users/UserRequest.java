package id.worx.worx.model.request.users;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("organization_name")
    private String organizationName;
    private String country;
}