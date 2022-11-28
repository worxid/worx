package id.worx.worx.service.dashboard;

import id.worx.worx.common.model.request.DashboardRequest;
import id.worx.worx.data.dto.DashboardStat;
import id.worx.worx.data.dto.DashboardStatDTO;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.FormRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DeviceRepository deviceRepository;
    private final FormRepository formRepository;
    @Override
    public List<DashboardStatDTO> getDashboardStat(LocalDate from, LocalDate to, DashboardRequest dashboardRequest) {
        String deviceCode = "";

        Optional<Device> device = deviceRepository.findById(dashboardRequest.getDeviceId());
        if(device.isPresent()){
            Device deviceData = device.get();
            deviceCode = deviceData.getDeviceCode();
        }

        List<DashboardStat> dashboardStatList = formRepository.getDasboardStat(from, to,deviceCode,dashboardRequest.getFormId());
        List<DashboardStatDTO> response = new ArrayList<>();

        for (DashboardStat data:dashboardStatList){

            DashboardStatDTO dashboardStatDTO = new DashboardStatDTO();
            dashboardStatDTO.setDate(data.getDates());
            dashboardStatDTO.setCount(data.getTotal_count());

            response.add(dashboardStatDTO);
        }

        return response;
    }

    public String deviceCode(Long deviceId){
        String deviceCode;

        Optional<Device> getDeviceCode = deviceRepository.findById(deviceId);
        if(getDeviceCode.isPresent()){
            Device device = getDeviceCode.get();
            deviceCode = device.getDeviceCode();
        }else{
            deviceCode = "";
        }

        return deviceCode;
    }

}
