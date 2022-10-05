package id.worx.worx.model.response.devices;

import com.fasterxml.jackson.annotation.JsonProperty;
import id.worx.worx.enums.DeviceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DeviceResponse implements Serializable {

    private static final long serialVersionUID = -229898976863068211L;
    private Long id;
    private String ip;
    private Integer port;
    private String label;
    @JsonProperty("device_model")
    private String deviceModel;
    @JsonProperty("device_os_version")
    private String deviceOsVersion;
    @JsonProperty("device_app_version")
    private String deviceAppVersion;
    @JsonProperty("device_language")
    private String deviceLanguage;
    @JsonProperty("device_code")
    private String deviceCode;
    @JsonProperty("device_status")
    private DeviceStatus deviceStatus;
    @JsonProperty("joined_time")
    private LocalDateTime joinedTime;
    private List<String> groups;
}
