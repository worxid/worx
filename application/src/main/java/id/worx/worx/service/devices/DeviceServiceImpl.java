package id.worx.worx.service.devices;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.enums.DeviceStatus;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.DeviceMapper;
import id.worx.worx.mapper.MobileDeviceMapper;
import id.worx.worx.model.request.devices.DeviceRequest;
import id.worx.worx.model.request.devices.UpdateDeviceRequest;
import id.worx.worx.model.response.devices.DeviceResponse;
import id.worx.worx.repository.DeviceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class DeviceServiceImpl implements DeviceService {

    private final DeviceMapper deviceMapper;

    private final DeviceRepository deviceRepository;

    private final MobileDeviceMapper mobileDeviceMapper;


    public DeviceServiceImpl(DeviceMapper deviceMapper, DeviceRepository deviceRepository, MobileDeviceMapper mobileDeviceMapper) {
        this.deviceMapper = deviceMapper;
        this.deviceRepository = deviceRepository;
        this.mobileDeviceMapper = mobileDeviceMapper;
    }


    @Override
    public Devices registerDevice(DeviceRequest request) {
        log.info("Start registering new device {}", request);

        String deviceCode = request.getDeviceCode();
        Optional<Devices> checkDevice = deviceRepository.findByDeviceCode(deviceCode);
        if (checkDevice.isPresent())
            throw new WorxException(WorxErrorCode.DEVICE_EXIST);

        Devices devices;
        devices = deviceMapper.toEntity(request);
        devices.setDeviceStatus(DeviceStatus.PENDING);
        devices.setJoinedTime(LocalDateTime.now());
        Devices newDevice = deviceRepository.save(devices);

        return newDevice;
    }

    @Override
    public void softDeleteDeviceForMobile(String deviceCode) {
        log.info("Trying to leave device code {}", deviceCode);
        Optional<Devices> foundDevice = deviceRepository.findByDeviceCode(deviceCode);
        if(!foundDevice.isPresent()){
            throw new WorxException(WorxErrorCode.DEVICE_NOT_FOUND);
        }
        Devices getDevice = foundDevice.get();


        getDevice.setDeleted(true);
        deviceRepository.save((getDevice));
    }

    @Override
    @Transactional
    public Devices updateInformation(String deviceCode, UpdateDeviceRequest deviceRequest) {

        Optional<Devices> foundedDevice;

        if (!deviceCode.isEmpty()) {
            foundedDevice = deviceRepository.findByDeviceCodeAndDeleted(deviceCode, false);
        } else {
            foundedDevice = deviceRepository.findByIdAndDeleted(deviceRequest.getDeviceNo(), false);
        }

        if (foundedDevice.isEmpty()) {
            throw new WorxException(WorxErrorCode.DEVICE_NOT_FOUND);
        }

        Devices device = foundedDevice.get();
        device.setDeviceModel(deviceRequest.getDeviceModel());
        device.setDeviceOsVersion(deviceRequest.getDeviceOsVersion());
        device.setDeviceAppVersion(deviceRequest.getDeviceAppVersion());
        device.setDeviceLanguage(deviceRequest.getDeviceLanguage());
        device.setPort(deviceRequest.getPort());
        device.setIp(deviceRequest.getIp());
        device.setLabel(deviceRequest.getLabel());

        Devices savedEntity = deviceRepository.save(device);

        return savedEntity;

    }

    @Override
    public Devices getByDeviceCode(String deviceCode){
        Optional<Devices> devices = deviceRepository.findByDeviceCode(deviceCode);
        Devices result = devices.get();

        return result;
    }
    @Override
    public DeviceResponse toDTO(Devices devices) {
        return mobileDeviceMapper.toDto(devices);
    }

}
