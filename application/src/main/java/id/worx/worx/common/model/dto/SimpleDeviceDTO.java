package id.worx.worx.common.model.dto;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIncludeProperties({
        "id",
        "label",
        "device_code"
})
@Setter
@Getter
public class SimpleDeviceDTO extends DeviceDTO {

    private static final long serialVersionUID = 165227395442457931L;

    public static SimpleDeviceDTO from(DeviceDTO deviceDTO) {
        SimpleDeviceDTO dto = new SimpleDeviceDTO();
        dto.setId(deviceDTO.getId());
        dto.setLabel(deviceDTO.getLabel());
        dto.setDeviceCode(deviceDTO.getDeviceCode());
        dto.setDeviceStatus(deviceDTO.getDeviceStatus());
        dto.setDeviceModel(deviceDTO.getDeviceModel());
        dto.setDeviceOsVersion(deviceDTO.getDeviceOsVersion());
        dto.setDeviceAppVersion(deviceDTO.getDeviceAppVersion());
        dto.setDeviceLanguage(deviceDTO.getDeviceLanguage());
        dto.setIp(deviceDTO.getIp());
        dto.setPort(deviceDTO.getPort());
        dto.setJoinedDate(deviceDTO.getJoinedDate());
        dto.setOrganizationCode(deviceDTO.getOrganizationCode());
        dto.setOrganizationName(deviceDTO.getOrganizationName());
        dto.setGroups(deviceDTO.getGroups());
        return dto;
    }

}
