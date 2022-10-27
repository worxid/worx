package id.worx.worx.service.devices;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import id.worx.worx.entity.Form;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import id.worx.worx.common.enums.DeviceStatus;
import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.request.device.ApproveRequest;
import id.worx.worx.common.model.response.PagingResponseModel;
import id.worx.worx.entity.Group;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
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
    public Device getById(Long id) {
        return deviceRepository.findById(id).orElseThrow(() -> new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR));
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.getAllDeviceByDeleted();
    }

    @Override
    public Device updateDeviceLabel(Long id, UpdateDeviceRequest request) {
        Device devices = getById(id);
        devices.setLabel(request.getLabel());
        return deviceRepository.save(devices);
    }

    @Override
    public Device approveDevice(Long id, ApproveRequest request) {
        Device device = getById(id);
        DeviceStatus status = device.getDeviceStatus();

        if (status.equals(DeviceStatus.PENDING)) {
            if (request.getIsApproved().equals(Boolean.TRUE)) {
                device.setDeviceStatus(DeviceStatus.APPROVED);
            } else {
                device.setDeviceStatus(DeviceStatus.DENIED);
            }
        }

        return deviceRepository.save(device);
    }

    @Transactional
    @Override
    public Device updateGroup(Long id, List<Long> groupIds) {
        Device device = this.findByIdorElseThrowNotFound(id);
        List<Group> groups = groupRepository.findAllById(groupIds);
        device.setAssignedGroups(new HashSet<>());
        groups = groups.stream()
                .map(group -> {
                    device.getAssignedGroups().add(group);
                    group.getDevices().add(device);
                    return group;
                })
                .collect(Collectors.toList());

        groupRepository.saveAll(groups);
        deviceRepository.save(device);
        return device;
    }

    @Override
    public void deleteDevice(Long id) {
        Device device = this.findByIdorElseThrowNotFound(id);
        deviceRepository.delete(device);
    }

    @Override
    public DeviceDTO toDto(Device devices) {
        DeviceDTO deviceResponse = deviceMapper.toResponse(devices);
        List<String> groupNames = devices.getAssignedGroups().stream().map(Group::getName).collect(Collectors.toList());
        if (groupNames != null)
            deviceResponse.setGroups(groupNames);
        return deviceResponse;
    }

//    @Override
//    public PagingResponseModel<DeviceDTO> getAllDevicesWithPage(DeviceSearchRequest deviceSearchRequest,
//            Pageable pageable) {
//        Pageable customPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
//                Sort.by(getDirection(pageable), getSortBy(pageable)));
//        Page<Device> devices = deviceRepository.findAll(deviceSpecification.fromSearchRequest(deviceSearchRequest),
//                customPageable);
//        return new PagingResponseModel<>(devices.map(this::toDto));
//    }
    @Override
    public Page<Device> getAllDeviceWithPage(DeviceSearchRequest deviceSearchRequest, Pageable pageable){

        Specification<Device> spec = deviceSpecification.fromSearchRequest(deviceSearchRequest);

        return deviceRepository.findAll(spec, pageable);
    }

    public String getSortBy(Pageable pageable) {
        String sortBy = pageable.getSort().stream().map(Sort.Order::getProperty).collect(Collectors.toList()).get(0);
        return sortBy.replaceFirst("_[a-z]",
                String.valueOf(
                        Character.toUpperCase(sortBy.charAt(sortBy.indexOf("_") + 1))));
    }

    public Sort.Direction getDirection(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getDirection).collect(Collectors.toList()).get(0);
    }

    private Device findByIdorElseThrowNotFound(Long id) {
        Optional<Device> device = deviceRepository.findById(id);

        if (device.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return device.get();
    }

}
