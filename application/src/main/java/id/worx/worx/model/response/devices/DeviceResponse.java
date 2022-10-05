package id.worx.worx.model.response.devices;

import id.worx.worx.enums.DeviceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.LocalDateTime;

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
    private String deviceModel;
    private String deviceOsVersion;
    private String deviceAppVersion;
    private String deviceLanguage;
    private String deviceCode;
    private DeviceStatus deviceStatus;
    private LocalDateTime joinedTime;
}
