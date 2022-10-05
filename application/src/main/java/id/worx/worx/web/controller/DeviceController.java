package id.worx.worx.web.controller;

import id.worx.worx.model.request.devices.DeviceSearchRequest;
import id.worx.worx.data.response.BaseListResponse;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.data.response.PagingResponseModel;
import id.worx.worx.model.request.devices.UpdateDeviceRequest;
import id.worx.worx.model.response.devices.DeviceResponse;
import id.worx.worx.service.DeviceWebService;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
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
public class DeviceController implements SecuredRestController{
    private final DeviceWebService deviceWebService;

    @GetMapping
    public ResponseEntity<BaseListResponse<DeviceResponse>> list(){
        List<DeviceResponse> deviceDTOS= deviceWebService.getAllDevices().stream().map(device-> deviceWebService.toDto(device)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(BaseListResponse.<DeviceResponse>builder()
            .list(deviceDTOS)
            .build());
    }

    @PostMapping("/search")
    public ResponseEntity<PagingResponseModel<DeviceResponse>> list(@RequestBody DeviceSearchRequest request,
                                                                    @SortDefault.SortDefaults({
                                                                        @SortDefault(sort = "created_on", direction = Sort.Direction.DESC)
                                                                    }) Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(deviceWebService.getAllDevicesWithPage(request,pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseValueResponse<DeviceResponse>> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceResponse>builder()
            .value(deviceWebService.toDto(deviceWebService.getById(id)))
            .build());
    }

    @PutMapping("/{id}/label")
    public ResponseEntity<BaseValueResponse<DeviceResponse>> updateLabel(@PathVariable("id")Long id, @RequestBody UpdateDeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceResponse>builder()
            .value(deviceWebService.toDto(deviceWebService.updateDeviceLabel(id,request)))
            .build());
    }

    @PutMapping("/{id}/group")
    public ResponseEntity<BaseValueResponse<DeviceResponse>> updateGroup(@PathVariable("id")Long id, @RequestBody UpdateDeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceResponse>builder()
            .value(deviceWebService.toDto(deviceWebService.updateDeviceGroup(id,request)))
            .build());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<BaseValueResponse<DeviceResponse>> approveDevice(@PathVariable("id")Long id, @RequestBody UpdateDeviceRequest request){
        return ResponseEntity.ok().body(BaseValueResponse.<DeviceResponse>builder()
            .value(deviceWebService.toDto(deviceWebService.approveDevice(id,request)))
            .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        deviceWebService.deleteDevice(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
