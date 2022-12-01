package id.worx.worx.web.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.Assertions;
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

        String label = "kay";
        String organizationCode = "WXOOACB";
        String deviceCode = "kay1234";
        String deviceModel = "xiaomi";
        String deviceOsVersion = "15.01";
        String deviceAppVersion = "1.0";
        String deviceLanguage = "Indonesia";
        Integer port = 8900;
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

        BaseValueResponse<DeviceDTO> deviceResponse = doPostWithTypedResponse(
            "/mobile/devices/register",
            request,
            new TypeReference<BaseValueResponse<DeviceDTO>>(){
            },
            status().isCreated());

        BaseListResponse<DeviceDTO> response2 = doGetTyped("/devices", new TypeReference<BaseListResponse<DeviceDTO>>() {
        });
        List<DeviceDTO> list2 = response.getList();

        assertEquals(list,list2);



    }

    @Test
    void toUpdateDevice() throws Exception{

        String label = "kay";
        String organizationCode = "WXOOACB";
        String deviceCode = "kay1234";
        String deviceModel = "xiaomi";
        String deviceOsVersion = "15.01";
        String deviceAppVersion = "1.0";
        String deviceLanguage = "Indonesia";
        Integer port = 8900;
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
        String UpdatedLabel = "kay-valud";
        String UpdatedOrganizationCode = "WXOOACB";
        String UpdatedDeviceCode = "kay1234";
        String UpdatedDeviceModel = "xiaomi";
        String UpdatedDeviceOsVersion = "15.01";
        String UpdatedDeviceAppVersion = "1.0";
        String UpdatedDeviceLanguage = "Indonesia";
        Integer UpdatedPort = 8900;
        String UpdatedIp = "127.0.0.1";

        MobileRegisterRequest requestUpdate = new MobileRegisterRequest(
            UpdatedLabel,
            UpdatedOrganizationCode,
            UpdatedDeviceCode,
            UpdatedDeviceModel,
            UpdatedDeviceOsVersion,
            UpdatedDeviceAppVersion,
            UpdatedDeviceLanguage,
            UpdatedPort,
            UpdatedIp
        );

        BaseValueResponse<DeviceDTO> actualResponse = doPutWithTypedResponse(
            "/devices/" + deviceId,
            requestUpdate,
            new TypeReference<BaseValueResponse<DeviceDTO>>() {
            });

        assertEquals(UpdatedLabel, actualResponse.getValue().getLabel());
        assertEquals(UpdatedOrganizationCode, actualResponse.getValue().getOrganizationCode());
        assertEquals(UpdatedDeviceCode, actualResponse.getValue().getDeviceCode());
        assertEquals(UpdatedDeviceModel, actualResponse.getValue().getDeviceModel());
        assertEquals(UpdatedDeviceOsVersion, actualResponse.getValue().getDeviceOsVersion());
        assertEquals(UpdatedDeviceAppVersion, actualResponse.getValue().getDeviceAppVersion());
        assertEquals(UpdatedDeviceLanguage, actualResponse.getValue().getDeviceLanguage());
        assertEquals(UpdatedPort, actualResponse.getValue().getPort());
        assertEquals(UpdatedIp, actualResponse.getValue().getIp());

    }

    @Test
    void testDeleteDevice() throws Exception{

        String label = "kay";
        String organizationCode = "WXOOACB";
        String deviceCode = "kay1234";
        String deviceModel = "xiaomi";
        String deviceOsVersion = "15.01";
        String deviceAppVersion = "1.0";
        String deviceLanguage = "Indonesia";
        Integer port = 8900;
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

        doDelete("/devices/"+ deviceId)
            .andExpect(status().isNoContent());

        doGet("/devices/"+ deviceId)
            .andExpect(status().isNotFound())
            .andExpect(statusReason(containsString(WorxErrorCode.ENTITY_NOT_FOUND_ERROR.getReasonPhrase())));

    }
}
