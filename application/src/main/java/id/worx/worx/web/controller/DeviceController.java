package id.worx.worx.web.controller;

import id.worx.worx.data.dto.DeviceDTO;
import id.worx.worx.data.request.DeviceRequest;
import id.worx.worx.data.request.DeviceSearchRequest;
import id.worx.worx.data.response.BaseListResponse;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.data.response.PagingResponseModel;
import id.worx.worx.service.DeviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("devices")
@RequiredArgsConstructor
public class DeviceController {
    private final DeviceService deviceService;

    @GetMapping
    public ResponseEntity<BaseListResponse<DeviceDTO>> list(){
        List<DeviceDTO> deviceDTOS=deviceService.getAllDevices().stream().map(device-> deviceService.toDto(device)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(BaseListResponse.<DeviceDTO>builder()
            .list(deviceDTOS)
            .build());
    }

    @GetMapping("/page")
    public ResponseEntity<PagingResponseModel<DeviceDTO>> list(@RequestBody DeviceSearchRequest request,
                                                               @PageableDefault(page = 0, size = 10)
                                                               @SortDefault.SortDefaults({
                                                                   @SortDefault(sort = "created_on", direction = Sort.Direction.DESC)
                                                               })
                                                               Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.getAllDevicesWithPage(request,pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.getById(id)))
            .build());
    }

    @PutMapping("/label")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> updateLabel(@RequestBody DeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.updateDeviceLabel(request)))
            .build());
    }

    @PutMapping("/group")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> updateGroup(@RequestBody DeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.updateDeviceGroup(request)))
            .build());
    }

    @PutMapping("/approve")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> approveDevice(@RequestBody DeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.approveDevice(request)))
            .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        deviceService.deleteDevice(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
