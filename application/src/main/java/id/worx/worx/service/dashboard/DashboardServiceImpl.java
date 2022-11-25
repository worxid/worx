package id.worx.worx.service.dashboard;

import id.worx.worx.common.model.request.DashboardRequest;
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

        String deviceCode;
        Integer count;

        List<DashboardStatDTO> responses = new ArrayList<>();
        List<LocalDate> totalDates = new ArrayList<>();
        while (!from.isAfter(to)) {
            totalDates.add(from);
            from = from.plusDays(1);
        }
        for(LocalDate dateList:totalDates){
            Instant startDate = Instant.parse(dateList+"T00:00:01Z");
            Instant endDate = Instant.parse(dateList+"T23:59:59Z");
            if(dashboardRequest.getFormId() != null && dashboardRequest.getDeviceId() != null){
                deviceCode = this.deviceCode(dashboardRequest.getDeviceId());
                count = formRepository.getCountByRespondentDeviceAndTemplateId(startDate,endDate,deviceCode, dashboardRequest.getFormId());
            }else if(dashboardRequest.getFormId() == null && dashboardRequest.getDeviceId() != null){
                deviceCode = this.deviceCode(dashboardRequest.getDeviceId());
                count = formRepository.getCountByRespondentDevice(startDate,endDate,deviceCode);
            }else if(dashboardRequest.getFormId() != null && dashboardRequest.getDeviceId() == null){
                count = formRepository.getCountByTemplateId(startDate,endDate,dashboardRequest.getFormId());
            }else{
                count = formRepository.getCountByDateOnly(startDate,endDate);
            }

            DashboardStatDTO dashboardStatDTO = new DashboardStatDTO();
            dashboardStatDTO.setCount(count);
            dashboardStatDTO.setDate(dateList);
            responses.add(dashboardStatDTO);
        }

        return responses;
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
