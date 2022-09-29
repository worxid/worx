package id.worx.worx.data.dto;

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
    private DeviceStatus deviceStatus;
    private String label;
    private String deviceCode;
    private String deviceModel;
    private String deviceOsVersion;
    private String deviceAppVersion;
    private LocalDateTime joinedTime;
    private List<String> groups;
}
