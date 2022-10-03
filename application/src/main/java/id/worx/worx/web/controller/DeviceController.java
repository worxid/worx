package id.worx.worx.web.controller;

import id.worx.worx.data.dto.DeviceDTO;
import id.worx.worx.data.request.DeviceRequest;
import id.worx.worx.data.request.DeviceSearchRequest;
import id.worx.worx.data.response.BaseListResponse;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.data.response.PagingResponseModel;
import id.worx.worx.service.DeviceService;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
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
public class DeviceController implements SecuredRestController{
    private final DeviceService deviceService;

    @GetMapping
    public ResponseEntity<BaseListResponse<DeviceDTO>> list(){
        List<DeviceDTO> deviceDTOS=deviceService.getAllDevices().stream().map(device-> deviceService.toDto(device)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(BaseListResponse.<DeviceDTO>builder()
            .list(deviceDTOS)
            .build());
    }

    @PostMapping("/search")
    public ResponseEntity<PagingResponseModel<DeviceDTO>> list(@RequestBody DeviceSearchRequest request,
                                                               @ParameterObject Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.getAllDevicesWithPage(request,pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.getById(id)))
            .build());
    }

    @PutMapping("/{id}/label")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> updateLabel(@PathVariable("id")Long id, @RequestBody DeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.updateDeviceLabel(id,request)))
            .build());
    }

    @PutMapping("/{id}/group")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> updateGroup(@PathVariable("id")Long id, @RequestBody DeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.updateDeviceGroup(id,request)))
            .build());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<BaseValueResponse<DeviceDTO>> approveDevice(@PathVariable("id")Long id, @RequestBody DeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceDTO>builder()
            .value(deviceService.toDto(deviceService.approveDevice(id,request)))
            .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        deviceService.deleteDevice(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
