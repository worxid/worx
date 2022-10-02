package id.worx.worx.mobile.controller;

import id.worx.worx.service.devices.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/mobile/devices")
public class MobileJoinDeviceController {

    private final DeviceService deviceService;

    @PostMapping("/register")
    public ResponseEntity<DeviceResponse> registerDevice(@RequestBody DeviceRequest request) {
        return ResponseEntity.ok(deviceService.registerDevice(request));
    }

}
