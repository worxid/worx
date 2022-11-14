package id.worx.worx.service.devices;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import id.worx.worx.common.model.request.device.ApproveRequest;
import id.worx.worx.entity.Group;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.specification.DeviceSpecification;
import id.worx.worx.util.JpaUtils;
import id.worx.worx.web.model.request.DeviceSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import id.worx.worx.common.enums.DeviceStatus;
import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.DeviceMapper;
import id.worx.worx.mapper.MobileDeviceMapper;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.web.model.request.UpdateDeviceRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeviceServiceImpl implements DeviceService {

    private final DeviceMapper deviceMapper;
    private final MobileDeviceMapper mobileDeviceMapper;

    private final DeviceRepository deviceRepository;
    private final UsersRepository userRepository;

    private final DeviceSpecification deviceSpecification;

    private final AuthenticationContext authContext;

    private final GroupRepository groupRepository;

    @Override
    public Device registerDevice(MobileRegisterRequest request) {
        log.trace("Start registering new device {}", request);

        String organizationCode = request.getOrganizationCode();
        Optional<Users> optUser = userRepository.findByOrganizationCode(organizationCode);
        if (optUser.isEmpty()) {
            throw new WorxException(WorxErrorCode.ORGANIZATION_CODE_IS_INVALID);
        }

        String deviceCode = request.getDeviceCode();
        Optional<Device> checkDevice = deviceRepository.findByDeviceCode(deviceCode);

        if (checkDevice.isPresent()) {
            Device device = checkDevice.get();
            if (device.getOrganizationCode().equals(organizationCode)) {
                throw new WorxException(WorxErrorCode.DEVICE_ALREADY_REGISTERED);
            }
        }

        Device devices;
        devices = deviceMapper.toEntity(request);
        devices.setDeviceStatus(DeviceStatus.PENDING);
        devices.setJoinedDate(Instant.now());
        return deviceRepository.save(devices);
    }

    @Override
    public void softDeleteDeviceForMobile(String deviceCode) {
        log.trace("Trying to leave device code {}", deviceCode);
        Optional<Device> foundDevice = deviceRepository.findByDeviceCode(deviceCode);
        if (!foundDevice.isPresent()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }
        Device getDevice = foundDevice.get();

        getDevice.setDeleted(true);
        deviceRepository.save((getDevice));
    }

    @Override
    @Transactional
    public Device updateInformation(String deviceCode, UpdateDeviceRequest deviceRequest) {

        Optional<Device> foundedDevice;

        if (!deviceCode.isEmpty()) {
            foundedDevice = deviceRepository.findByDeviceCodeAndDeleted(deviceCode, false);
        } else {
            foundedDevice = deviceRepository.findByIdAndDeleted(deviceRequest.getDeviceNo(), false);
        }

        if (foundedDevice.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        Device device = foundedDevice.get();
        device.setDeviceModel(deviceRequest.getDeviceModel());
        device.setDeviceOsVersion(deviceRequest.getDeviceOsVersion());
        device.setDeviceAppVersion(deviceRequest.getDeviceAppVersion());
        device.setDeviceLanguage(deviceRequest.getDeviceLanguage());
        device.setPort(deviceRequest.getPort());
        device.setIp(deviceRequest.getIp());
        device.setLabel(deviceRequest.getLabel());

        return deviceRepository.save(device);

    }

    @Override
    public Device getByDeviceCode(String deviceCode) {
        return this.findByDeviceCodeorElseThrowNotFound(deviceCode);
    }

    @Override
    public DeviceDTO toDTOMobile(Device devices) {
        return mobileDeviceMapper.toDto(devices);
    }

    private Device findByDeviceCodeorElseThrowNotFound(String deviceCode) {
        Optional<Device> devices = deviceRepository.findByDeviceCode(deviceCode);

        if (devices.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return devices.get();
    }


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
        Users user = authContext.getUsers();
        Device device = getById(id);
        DeviceStatus status = device.getDeviceStatus();

        if (status.equals(DeviceStatus.PENDING)) {
            if (request.getIsApproved().equals(Boolean.TRUE)) {
                device.setDeviceStatus(DeviceStatus.APPROVED);
            } else {
                device.setDeviceStatus(DeviceStatus.DENIED);
            }
        }
        device = deviceRepository.save(device);

        Optional<Group> defaultUserGroupOptional = groupRepository.findByIsDefaultTrueAndUserId(user.getId());
        if (defaultUserGroupOptional.isPresent()) {
            Group defaultGroup = defaultUserGroupOptional.get();
            device.getAssignedGroups().add(defaultGroup);
            defaultGroup.getDevices().add(device);
            groupRepository.save(defaultGroup);
        }

        return deviceRepository.save(device);
    }

    @javax.transaction.Transactional
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

    @Override
    public Page<Device> search(DeviceSearchRequest deviceSearchRequest, Pageable pageable) {
        Specification<Device> spec = deviceSpecification.fromSearchRequest(deviceSearchRequest,
            authContext.getUsers().getOrganizationCode());
        Pageable adjustedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
            JpaUtils.replaceSort(pageable.getSort()));
        return deviceRepository.findAll(spec, adjustedPageable);
    }

    private Device findByIdorElseThrowNotFound(Long id) {
        Optional<Device> device = deviceRepository.findById(id);

        if (device.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return device.get();
    }

    @Override
    public void deleteDevice(List<Long> ids) {
        List<Device> devices = deviceRepository.findAllById(ids);
        for (Device device : devices) {
            deviceRepository.deleteById(device.getId());
        }
    }

}
