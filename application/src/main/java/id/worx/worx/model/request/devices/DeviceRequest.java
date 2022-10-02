package id.worx.worx.model.request.devices;

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

    private String deviceCode; // device id
    private String deviceName;
    private String deviceModel;
    private String deviceOsVersion;
    private String deviceAppVersion;
    private String deviceLanguage;
    private String description;
    private String port;
    private String ip;
    private String longitude;
    private String latitude;
    private String address;
    private String label;

}
