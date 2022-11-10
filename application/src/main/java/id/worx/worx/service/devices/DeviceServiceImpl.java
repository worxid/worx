package id.worx.worx.service.devices;

import java.time.Instant;
import java.util.Optional;

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
    public DeviceDTO toDTO(Device devices) {
        return mobileDeviceMapper.toDto(devices);
    }

    private Device findByDeviceCodeorElseThrowNotFound(String deviceCode) {
        Optional<Device> devices = deviceRepository.findByDeviceCode(deviceCode);

        if (devices.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return devices.get();
    }

}