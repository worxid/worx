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

    private static final long serialVersionUID = 6669512422636422620L;

    private String email;
    @JsonProperty("organization_name")
    private String organizationName;
    @JsonProperty("organization_code")
    private String organizationCode;
    private String country;
    private String phone;
    @JsonProperty("logo_url")
    private String logoUrl;

}
