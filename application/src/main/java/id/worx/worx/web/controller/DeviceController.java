package id.worx.worx.web.controller;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.request.MultipleDeleteRequest;
import id.worx.worx.common.model.request.device.ApproveRequest;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BasePageResponse;
import id.worx.worx.common.model.response.BaseResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.service.devices.DeviceWebService;
import id.worx.worx.web.model.request.DeviceSearchRequest;
import id.worx.worx.web.model.request.UpdateDeviceRequest;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

@RestController
@RequestMapping("devices")
@RequiredArgsConstructor
public class DeviceController implements SecuredRestController {
    private final DeviceWebService deviceWebService;

    @GetMapping
    public ResponseEntity<BaseListResponse<DeviceDTO>> list() {
        List<DeviceDTO> deviceDTOS = deviceWebService.getAllDevices().stream().map(deviceWebService::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(BaseListResponse.<DeviceDTO>builder()
                .list(deviceDTOS)
                .build());
    }

    @PostMapping("/search")
    public ResponseEntity<Page<DeviceDTO>> list(@RequestBody DeviceSearchRequest request,
                                                @ParameterObject Pageable pageable) {
        Page<Device> devices = deviceWebService.getAllDeviceWithPage(request,pageable);

        List<DeviceDTO> deviceDTOS = devices.stream()
            .map(deviceWebService::toDto)
            .collect(Collectors.toList());


        Page<DeviceDTO> page = new BasePageResponse<>(deviceDTOS, devices.getPageable(), devices.getTotalElements());
        return ResponseEntity.status(HttpStatus.OK)
            .body(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
                .value(deviceWebService.toDto(deviceWebService.getById(id)))
                .build());
    }

    @PutMapping("/{id}/label")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> updateLabel(@PathVariable("id") Long id,
            @RequestBody UpdateDeviceRequest request) {
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
                .value(deviceWebService.toDto(deviceWebService.updateDeviceLabel(id, request)))
                .build());
    }

    @PutMapping("/{id}/group")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> updateGroup(@PathVariable("id") Long id,
            @RequestBody UpdateDeviceRequest request) {
        Device device = deviceWebService.updateGroup(id, request.getGroupIds());
        DeviceDTO dto = deviceWebService.toDto(device);
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
                .value(dto)
                .build());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> approveDevice(
            @PathVariable("id") Long id,
            @RequestBody @Valid ApproveRequest request) {
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
                .value(deviceWebService.toDto(deviceWebService.approveDevice(id, request)))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        deviceWebService.deleteDevice(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse> delete(@RequestBody @Valid MultipleDeleteRequest request) {
        deviceWebService.deleteDevice(request.getIds());
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
            .body(BaseResponse.builder().build());
    }
}
