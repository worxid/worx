package id.worx.worx.mobile.model.request;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MobileRegisterRequest implements Serializable {

    private static final long serialVersionUID = 8572019733827716211L;

    private String label;
    @JsonProperty("organization_code")
    private String organizationCode;

    @JsonProperty("device_code")
    private String deviceCode;
    @JsonProperty("device_model")
    private String deviceModel;
    @JsonProperty("device_os_version")
    private String deviceOsVersion;
    @JsonProperty("device_app_version")
    private String deviceAppVersion;
    @JsonProperty("device_language")
    private String deviceLanguage;

    private Integer port;
    private String ip;

}
