package id.worx.worx.web.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ContextConfiguration(classes = { DeviceControllerTest.Config.class })
class DeviceControllerTest extends AbstractControllerTest{

    static class Config{

    }

    @Test
    void testGetListDevice() throws Exception{
        BaseListResponse<DeviceDTO> response = doGetTyped("/devices", new TypeReference<BaseListResponse<DeviceDTO>>() {
        });
        List<DeviceDTO> list = response.getList();

    }
    @Test
    void testDeleteDevice() throws Exception{

        String label = "test-worx";
        String organizationCode = "WX0001";
        String deviceCode = "abcdefg123";
        String deviceModel = "";
        String deviceOsVersion = "";
        String deviceAppVersion = "";
        String deviceLanguage = "";
        Integer port = 8080;
        String ip = "127.0.0.1";

        MobileRegisterRequest request = new MobileRegisterRequest(
            label,
            organizationCode,
            deviceCode,
            deviceModel,
            deviceOsVersion,
            deviceAppVersion,
            deviceLanguage,
            port,
            ip
        );

        BaseValueResponse<DeviceDTO> response = doPostWithTypedResponse(
            "/mobile/devices/register",
            request,
            new TypeReference<BaseValueResponse<DeviceDTO>>(){
            },
            status().isCreated());

        DeviceDTO dto = response.getValue();
        assertEquals(label, dto.getLabel());
        assertEquals(organizationCode, dto.getOrganizationCode());
        assertEquals(deviceCode, dto.getDeviceCode());
        assertEquals(deviceModel, dto.getDeviceModel());
        assertEquals(deviceOsVersion, dto.getDeviceOsVersion());
        assertEquals(deviceAppVersion, dto.getDeviceAppVersion());
        assertEquals(deviceLanguage, dto.getDeviceLanguage());
        assertEquals(port, dto.getPort());
        assertEquals(ip, dto.getIp());

        Long deviceId = dto.getId();

        doDelete("devices/"+ deviceId)
            .andExpect(status().isNoContent());

        doGet("devices/"+ deviceId)
            .andExpect(status().isNotFound())
            .andExpect(statusReason(containsString(WorxErrorCode.ENTITY_NOT_FOUND_ERROR.getReasonPhrase())));

    }
}
