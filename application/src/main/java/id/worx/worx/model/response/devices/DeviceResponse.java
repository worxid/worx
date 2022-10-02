package id.worx.worx.model.response.devices;

import id.worx.worx.enums.DeviceStatus;

import java.io.Serializable;
import java.time.LocalDateTime;

public class DeviceResponse implements Serializable {

    private static final long serialVersionUID = -229898976863068211L;
    private Long deviceNo;
    private String deviceCode;
    private String deviceName;
    private String deviceModel;
    private String deviceOSVersion;
    private String deviceAppVersion;
    private String deviceLanguage;
    private String description;
    private Long groupNo;
    private String groupName;
    private String label;
    private DeviceStatus status;
    private LocalDateTime joinedTime;
}
