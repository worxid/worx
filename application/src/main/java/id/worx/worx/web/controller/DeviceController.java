package id.worx.worx.web.controller;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.common.model.response.PagingResponseModel;
import id.worx.worx.service.devices.DeviceWebService;
import id.worx.worx.web.model.request.DeviceSearchRequest;
import id.worx.worx.web.model.request.UpdateDeviceRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<PagingResponseModel<DeviceDTO>> list(@RequestBody DeviceSearchRequest request,
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "created_on", direction = Sort.Direction.DESC)
            }) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(deviceWebService.getAllDevicesWithPage(request, pageable));
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
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
                .value(deviceWebService.toDto(deviceWebService.updateDeviceGroup(id, request)))
                .build());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> approveDevice(@PathVariable("id") Long id,
            @RequestBody UpdateDeviceRequest request) {
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
                .value(deviceWebService.toDto(deviceWebService.approveDevice(id, request)))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        deviceWebService.deleteDevice(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
