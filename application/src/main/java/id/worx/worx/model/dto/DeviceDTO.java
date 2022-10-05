package id.worx.worx.model.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.enums.DeviceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DeviceDTO implements Serializable {

    private static final long serialVersionUID = -229898976863068211L;

    private Long id;
    private String label;
    @JsonProperty("device_code")
    private String deviceCode;
    @JsonProperty("device_status")
    private DeviceStatus deviceStatus;
    @JsonProperty("device_model")
    private String deviceModel;
    @JsonProperty("device_os_version")
    private String deviceOsVersion;
    @JsonProperty("device_app_version")
    private String deviceAppVersion;
    @JsonProperty("device_language")
    private String deviceLanguage;
    private String ip;
    private Integer port;
    @JsonProperty("joined_time")
    private Instant joinedDate;
    private List<String> groups;

}
