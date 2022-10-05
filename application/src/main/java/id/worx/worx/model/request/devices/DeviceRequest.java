package id.worx.worx.model.request.devices;

import com.fasterxml.jackson.annotation.JsonProperty;
import id.worx.worx.enums.DeviceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceRequest implements Serializable {

    private Long id;
    @JsonProperty("device_code")
    private String deviceCode;
    @JsonProperty("device_name")
    private String deviceName;
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
    private String longitude;
    private String latitude;
    private String address;
    private String label;
    @JsonProperty("device_status")
    private DeviceStatus deviceStatus;

}
