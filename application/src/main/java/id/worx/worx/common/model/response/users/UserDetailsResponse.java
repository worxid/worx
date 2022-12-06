package id.worx.worx.common.model.response.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponse implements Serializable {

    private String email;
    private String fullname;
    @JsonProperty("organization_name")
    private String organizationName;
    @JsonProperty("organization_code")
    private String organizationCode;
    private String country;
    private String phone;
    private String logoUrl;
}
