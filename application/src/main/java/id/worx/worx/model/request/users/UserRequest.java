package id.worx.worx.model.request.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
public class UserRequest implements Serializable {
    private String fullname;
    private String password;
    private String email;
    @Size(min=10, max=20, message = "Phone Number too short")
    private String phoneNo;
    @JsonProperty("organization_name")
    private String organizationName;
    private String country;
}
