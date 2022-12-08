package id.worx.worx.web.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import id.worx.worx.common.enums.DeviceStatus;
import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.request.MultipleDeleteRequest;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.GroupServiceImpl;
import id.worx.worx.service.devices.DeviceService;
import id.worx.worx.service.users.UsersServiceImpl;
import id.worx.worx.web.model.request.UpdateDeviceRequest;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.test.context.ContextConfiguration;

import java.time.Instant;
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

        System.out.println("size 1 : "+ list.size());

        String label = "main-label";
        String organizationCode = this.organizationCode;
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
            status().isOk());

        BaseListResponse<DeviceDTO> response2 = doGetTyped("/devices", new TypeReference<BaseListResponse<DeviceDTO>>() {
        });
        List<DeviceDTO> list2 = response2.getList();
        System.out.println("size 2 : "+ list2.size());
        assertEquals(list,list2);

    }

    @Test
    void toGetSearch() throws Exception{


        BaseListResponse<DeviceDTO> response = doGetTyped("/devices", new TypeReference<BaseListResponse<DeviceDTO>>() {
        });
        List<DeviceDTO> list = response.getList();

        String label = "main-label";
        String organizationCode = this.organizationCode;
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
            status().isOk());

        BaseListResponse<DeviceDTO> response2 = doGetTyped("/devices", new TypeReference<BaseListResponse<DeviceDTO>>() {
        });
        List<DeviceDTO> list2 = response2.getList();

        assertEquals(list,list2);

    }
    @Test
    void toUpdateDeviceLabel() throws Exception{

        String label = "main-label";
        String organizationCode = this.organizationCode;
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
            status().isOk());

        DeviceDTO dto = response.getValue();
        Long deviceId = dto.getId();
        assertEquals(label, dto.getLabel());
        assertEquals(organizationCode, dto.getOrganizationCode());
        assertEquals(deviceCode, dto.getDeviceCode());
        assertEquals(deviceModel, dto.getDeviceModel());
        assertEquals(deviceOsVersion, dto.getDeviceOsVersion());
        assertEquals(deviceAppVersion, dto.getDeviceAppVersion());
        assertEquals(deviceLanguage, dto.getDeviceLanguage());
        assertEquals(port, dto.getPort());
        assertEquals(ip, dto.getIp());

        String UpdatedLabel = "main-label1";

        UpdateDeviceRequest dtoUpdate = new UpdateDeviceRequest();
        dtoUpdate.setLabel(UpdatedLabel);

        BaseValueResponse<DeviceDTO> actualResponse = doPutWithTypedResponse(
            "/devices/"+deviceId+"/label",
            dtoUpdate,
            new TypeReference<BaseValueResponse<DeviceDTO>>() {
            });

        assertEquals(UpdatedLabel, actualResponse.getValue().getLabel());

    }

    void toUpdateDevice() throws Exception{

        String label = "kay";
        String organizationCode = this.organizationCode;
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
            status().isOk());

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

        String UpdatedLabel = "kay-valud";
        String UpdatedOrganizationCode = this.organizationCode;
        String UpdatedDeviceCode = "kay1234";
        String UpdatedDeviceModel = "xiaomi";
        String UpdatedDeviceOsVersion = "15.01";
        String UpdatedDeviceAppVersion = "1.0";
        String UpdatedDeviceLanguage = "Indonesia";
        Integer UpdatedPort = 8900;
        String UpdatedIp = "127.0.0.1";

        UpdateDeviceRequest dtoUpdate = new UpdateDeviceRequest();
        dtoUpdate.setLabel(UpdatedLabel);
        dtoUpdate.setDeviceModel(UpdatedDeviceModel);
        dtoUpdate.setDeviceOsVersion(UpdatedDeviceOsVersion);
        dtoUpdate.setDeviceAppVersion(UpdatedDeviceAppVersion);
        dtoUpdate.setDeviceLanguage(UpdatedDeviceLanguage);
        dtoUpdate.setPort(UpdatedPort);
        dtoUpdate.setIp(UpdatedIp);

        BaseValueResponse<DeviceDTO> actualResponse = doPutWithTypedResponse(
            "/mobile/devices/update-info",
            dtoUpdate,
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
    void testMultipleDeleteDevice() throws Exception{

        String label = "main-label";
        String organizationCode = this.organizationCode;
        String deviceCode = "kay1234";
        String deviceModel = "xiaomi";
        String deviceOsVersion = "15.01";
        String deviceAppVersion = "1.0";
        String deviceLanguage = "Indonesia";
        Integer port = 8900;
        String ip = "127.0.0.1";

        DeviceDTO dtoReq = new DeviceDTO();
        dtoReq.setLabel(label);
        dtoReq.setOrganizationCode(organizationCode);
        dtoReq.setDeviceCode(deviceCode);
        dtoReq.setDeviceModel(deviceModel);
        dtoReq.setDeviceOsVersion(deviceOsVersion);
        dtoReq.setDeviceAppVersion(deviceAppVersion);
        dtoReq.setDeviceLanguage(deviceLanguage);
        dtoReq.setIp(ip);
        dtoReq.setDeviceStatus(DeviceStatus.PENDING);
        //dtoReq.setJoinedDate(Instant.now());
        dtoReq.setPort(port);


        BaseValueResponse<DeviceDTO> response = doPostWithTypedResponse(
            "/mobile/devices/register",
            dtoReq,
            new TypeReference<BaseValueResponse<DeviceDTO>>(){
            },
            status().isOk());

        DeviceDTO dto = response.getValue();

        Long deviceId = dto.getId();


        MultipleDeleteRequest deleteRequest = new MultipleDeleteRequest(List.of(deviceId));
        System.out.println("size : "+ deleteRequest.getIds());
        doDelete("/devices", deleteRequest)
            .andExpect(status().isNoContent());

    }

    @Test
    void testDeleteDevice() throws Exception{

        String label = "main-label";
        String organizationCode = this.organizationCode;
        String deviceCode = "kay1234";
        String deviceModel = "xiaomi";
        String deviceOsVersion = "15.01";
        String deviceAppVersion = "1.0";
        String deviceLanguage = "Indonesia";
        Integer port = 8900;
        String ip = "127.0.0.1";

        DeviceDTO dtoReq = new DeviceDTO();
        dtoReq.setLabel(label);
        dtoReq.setOrganizationCode(organizationCode);
        dtoReq.setDeviceCode(deviceCode);
        dtoReq.setDeviceModel(deviceModel);
        dtoReq.setDeviceOsVersion(deviceOsVersion);
        dtoReq.setDeviceAppVersion(deviceAppVersion);
        dtoReq.setDeviceLanguage(deviceLanguage);
        dtoReq.setIp(ip);
        dtoReq.setDeviceStatus(DeviceStatus.PENDING);
        //dtoReq.setJoinedDate(Instant.now());
        dtoReq.setPort(port);


        BaseValueResponse<DeviceDTO> response = doPostWithTypedResponse(
            "/mobile/devices/register",
            dtoReq,
            new TypeReference<BaseValueResponse<DeviceDTO>>(){
            },
            status().isOk());

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
