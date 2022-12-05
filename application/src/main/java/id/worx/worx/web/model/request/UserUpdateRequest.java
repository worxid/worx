package id.worx.worx.web.model.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserUpdateRequest implements Serializable {

    private String fullname;
    private String phone;
    @JsonProperty("organization_name")
    private String organizationName;
    @JsonProperty("dashboard_logo_id")
    private Long dashboardLogoId;
}
