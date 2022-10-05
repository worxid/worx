package id.worx.worx.service.devices;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import id.worx.worx.common.enums.DeviceStatus;
import id.worx.worx.common.exception.WorxErrorCode;
import id.worx.worx.common.exception.WorxException;
import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.response.PagingResponseModel;
import id.worx.worx.entity.Group;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.mapper.DeviceMapper;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.service.specification.DeviceSpecification;
import id.worx.worx.web.model.request.DeviceSearchRequest;
import id.worx.worx.web.model.request.UpdateDeviceRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class DeviceWebWebServiceImpl implements DeviceWebService {

    private final DeviceRepository deviceRepository;
    private final GroupRepository groupRepository;
    private final DeviceMapper deviceMapper;
    private final DeviceSpecification deviceSpecification;


    @Override
    public Devices getById(Long id) {
        return deviceRepository.findById(id).orElseThrow(()-> new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR));
    }

    @Override
    public List<Devices> getAllDevices() {
        return deviceRepository.getAllDeviceByDeleted();
    }

    @Override
    public Devices updateDeviceLabel(Long id,UpdateDeviceRequest request) {
        Devices devices=getById(id);
        devices.setLabel(request.getLabel());
        return deviceRepository.save(devices);
    }

    @Override
    public Devices approveDevice(Long id, UpdateDeviceRequest request) {
        Devices devices=getById(id);
        if(devices.getDeviceStatus().ordinal()==2)
            devices.setDeviceStatus(DeviceStatus.APPROVED);
        return deviceRepository.save(devices);
    }

    @Override
    public Devices updateDeviceGroup(Long id,UpdateDeviceRequest request) {
        Devices devices=getById(id);
        deleteDeviceGroupByDeviceId(devices);
        if (request.getGroupIds()!=null&&!request.getGroupIds().isEmpty()){
            addDeviceGroup(devices,request.getGroupIds());
        }
        return deviceRepository.save(devices);
    }

    @Override
    public void deleteDevice(Long id) {
        Devices devices= getById(id);
        devices.setDeleted(true);
        deviceRepository.save(devices);
    }

    @Override
    public DeviceDTO toDto(Devices devices) {
        DeviceDTO deviceResponse= deviceMapper.toResponse(devices);
        List<String> groupNames = devices.getDeviceGroups().stream().map(Group::getName).collect(Collectors.toList());
        if(groupNames!=null)
            deviceResponse.setGroups(groupNames);
        return deviceResponse;
    }

    @Override
    public PagingResponseModel<DeviceDTO> getAllDevicesWithPage(DeviceSearchRequest deviceSearchRequest, Pageable pageable) {
        Pageable customPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
            Sort.by(getDirection(pageable),getSortBy(pageable)));
        Page<Devices> devices= deviceRepository.findAll(deviceSpecification.fromSearchRequest(deviceSearchRequest),customPageable);
        return new PagingResponseModel<>(devices.map(this::toDto));
    }

    public void deleteDeviceGroupByDeviceId(Devices devices){
        List<Group> groups= devices.getDeviceGroups().stream().collect(Collectors.toList());
        devices.getDeviceGroups().removeAll(groups);
        deviceRepository.save(devices);
    }

    public void addDeviceGroup(Devices devices, List<Long> groupIds) {
        List<Group> groups = groupRepository.getAllByIds(groupIds);
        if (groups != null && !groups.isEmpty()) {
            devices.setDeviceGroups(new HashSet<>());
            groups.forEach(group -> devices.getDeviceGroups().add(group));
            deviceRepository.save(devices);
        }
    }

    public String getSortBy(Pageable pageable){
        String sortBy=pageable.getSort().stream().map(Sort.Order::getProperty).collect(Collectors.toList()).get(0);
        return sortBy.replaceFirst("_[a-z]",
            String.valueOf(
                Character.toUpperCase(sortBy.charAt(sortBy.indexOf("_") + 1))
            ));
    }

    public Sort.Direction getDirection(Pageable pageable){
        return pageable.getSort().stream().map(Sort.Order::getDirection).collect(Collectors.toList()).get(0);
    }
}
