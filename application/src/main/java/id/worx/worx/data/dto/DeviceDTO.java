package id.worx.worx.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import id.worx.worx.enums.DeviceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDTO implements Serializable {
    private Long id;
    @JsonProperty("device_status")
    private DeviceStatus deviceStatus;
    @JsonProperty("label")
    private String label;
    @JsonProperty("device_code")
    private String deviceCode;
    @JsonProperty("device_model")
    private String deviceModel;
    @JsonProperty("device_os_version")
    private String deviceOsVersion;
    @JsonProperty("device_app_version")
    private String deviceAppVersion;
    @JsonProperty("joined_time")
    private LocalDateTime joinedTime;
    private List<String> groups;
}
