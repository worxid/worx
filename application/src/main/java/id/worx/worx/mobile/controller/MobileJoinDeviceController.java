package id.worx.worx.mobile.controller;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.model.request.devices.DeviceRequest;
import id.worx.worx.model.request.devices.UpdateDeviceRequest;
import id.worx.worx.model.response.devices.DeviceResponse;
import id.worx.worx.service.devices.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("mobile/devices")
public class MobileJoinDeviceController {

    private final DeviceService deviceService;

    @PostMapping("/register")
    public ResponseEntity<BaseValueResponse<DeviceResponse>> registerDevice(@RequestBody DeviceRequest request) {

        Devices devices = deviceService.registerDevice(request);
        DeviceResponse dto = deviceService.toDTO(devices);

        BaseValueResponse<DeviceResponse> response = BaseValueResponse.<DeviceResponse>builder()
            .value(dto)
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .body(response);
    }

    @PutMapping(value = "/leave")
    public ResponseEntity<String> leaveDevice(@RequestHeader(value = "deviceCode") String deviceCode) {
        deviceService.softDeleteDeviceForMobile(deviceCode);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted");
    }

    @PutMapping(value = "/update-info")
    public ResponseEntity<BaseValueResponse<DeviceResponse>> updateDeviceInformation(
        @RequestHeader(value = "deviceCode", required = true) String deviceCode, @RequestBody UpdateDeviceRequest deviceRequest) {

        Devices devices = deviceService.updateInformation(deviceCode, deviceRequest);
        DeviceResponse dto = deviceService.toDTO(devices);

        BaseValueResponse<DeviceResponse> response = BaseValueResponse.<DeviceResponse>builder()
            .value(dto)
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .body(response);

    }

    @GetMapping("/get-info-device")
    public ResponseEntity<BaseValueResponse<DeviceResponse>> getInfoDevice(@RequestHeader(value = "deviceCode") String deviceCode) {

        Devices devices = deviceService.getByDeviceCode(deviceCode);
        DeviceResponse dto = deviceService.toDTO(devices);

        BaseValueResponse<DeviceResponse> response = BaseValueResponse.<DeviceResponse>builder()
            .value(dto)
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .body(response);

    }
}
