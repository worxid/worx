package id.worx.worx.service;

import id.worx.worx.data.dto.DeviceDTO;
import id.worx.worx.data.request.DeviceRequest;
import id.worx.worx.data.request.DeviceSearchRequest;
import id.worx.worx.data.response.PagingResponseModel;
import id.worx.worx.entity.Group;
import id.worx.worx.entity.devices.DeviceGroup;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.enums.DeviceStatus;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.DeviceMapper;
import id.worx.worx.repository.DeviceGroupRepository;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DeviceServiceImpl implements DeviceService{

    private final DeviceRepository deviceRepository;
    private final GroupRepository groupRepository;
    private final DeviceGroupRepository deviceGroupRepository;
    private final DeviceMapper deviceMapper;


    @Override
    public Devices getById(Long id) {
        return deviceRepository.findById(id).orElseThrow(()-> new WorxException("Device with id: "+id+" not found",404));
    }

    @Override
    public List<Devices> getAllDevices() {
        System.out.println("A");
        List<Devices> devices=deviceRepository.getAllDeviceByDeleted();
        System.out.println(devices.isEmpty());
        return devices;
    }

    @Override
    public Devices updateDeviceLabel(DeviceRequest request) {
        Devices devices=getById(request.getId());
        devices.setLabel(request.getLabel());
        return deviceRepository.save(devices);
    }

    @Override
    public Devices approveDevice(DeviceRequest request) {
        Devices devices=getById(request.getId());
        devices.setDeviceStatus(DeviceStatus.APPROVED);
        return deviceRepository.save(devices);
    }

    @Override
    public Devices updateDeviceGroup(DeviceRequest request) {
        Devices devices=getById(request.getId());
        deleteDeviceGroupByDeviceId(devices.getId());
        if (request.getGroupIds()!=null&&request.getGroupIds().size()>0){
            addDeviceGroup(devices.getId(),request.getGroupIds());
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
        DeviceDTO deviceDTO= deviceMapper.toDto(devices);
        List<String> groupNames = deviceGroupRepository.getGroupNameByDeviceId(devices.getId());
        if(groupNames!=null)
            deviceDTO.setGroups(groupNames);
        return deviceDTO;
    }

    @Override
    public PagingResponseModel<DeviceDTO> getAllDevicesWithPage(DeviceSearchRequest deviceSearchRequest, Pageable pageable) {
        Pageable customPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
            Sort.by(getDirection(pageable),getSortBy(pageable)));
        Page<Devices> devices= deviceRepository.search(
            deviceSearchRequest.getLabel(),
            deviceSearchRequest.getDeviceModel(),
            deviceSearchRequest.getDeviceOsVersion(),
            deviceSearchRequest.getDeviceAppVersion(),
            deviceSearchRequest.getDeviceCode(),
            deviceSearchRequest.getGlobalSearch(),
            customPageable
        );
        return new PagingResponseModel<>(devices.map(device -> toDto(device)));
    }

    public void deleteDeviceGroupByDeviceId(Long deviceId){
        List<DeviceGroup> deviceGroups= deviceGroupRepository.getDeviceGroupBydeviceId(deviceId);
        if(deviceGroups!=null)
            deviceGroups.forEach(deviceGroup -> deviceGroupRepository.delete(deviceGroup));
    }

    public void addDeviceGroup(Long deviceId, List<Long> groupIds) {
        List<Group> groups = groupRepository.getAllByIds(groupIds);
        if (groups != null && groups.size() > 0) {
            List<DeviceGroup> newDeviceGroup  = new ArrayList<>();
            groups.forEach(group -> newDeviceGroup.add(new DeviceGroup(deviceId, group.getId())));
            deviceGroupRepository.saveAll(newDeviceGroup);
        }
    }

    public String camelToSnakeCase(String sortBy){
        return sortBy.replaceAll("([a-z])([A-Z]+)","$1_$2").toLowerCase();
    }

    public String getSortBy(Pageable pageable){
        String sortBy=camelToSnakeCase(pageable.getSort().stream().map(sort-> sort.getProperty()).collect(Collectors.toList()).get(0));
        return sortBy;
    }

    public Sort.Direction getDirection(Pageable pageable){
        Sort.Direction direction= pageable.getSort().stream().map(sort-> sort.getDirection()).collect(Collectors.toList()).get(0);
        return direction;
    }
}
