package id.worx.worx.mobile.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import id.worx.worx.service.devices.DeviceService;
import id.worx.worx.web.model.request.UpdateDeviceRequest;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("mobile/devices")
public class MobileDeviceController {

    private final DeviceService deviceService;

    @PostMapping("/register")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> registerDevice(@RequestBody MobileRegisterRequest request) {

        Device devices = deviceService.registerDevice(request);
        DeviceDTO dto = deviceService.toDTO(devices);

        BaseValueResponse<DeviceDTO> response = BaseValueResponse.<DeviceDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @PutMapping(value = "/leave")
    public ResponseEntity<String> leaveDevice(@RequestHeader(value = "device_code") String deviceCode) {
        deviceService.softDeleteDeviceForMobile(deviceCode);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted");
    }

    @PutMapping(value = "/update-info")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> updateDeviceInformation(
            @RequestHeader(value = "device_code", required = true) String deviceCode,
            @RequestBody UpdateDeviceRequest deviceRequest) {

        Device devices = deviceService.updateInformation(deviceCode, deviceRequest);
        DeviceDTO dto = deviceService.toDTO(devices);

        BaseValueResponse<DeviceDTO> response = BaseValueResponse.<DeviceDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);

    }

    @GetMapping("/get-info-device")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> getInfoDevice(
            @RequestHeader(value = "device_code") String deviceCode) {

        Device devices = deviceService.getByDeviceCode(deviceCode);
        DeviceDTO dto = deviceService.toDTO(devices);

        BaseValueResponse<DeviceDTO> response = BaseValueResponse.<DeviceDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);

    }
}
