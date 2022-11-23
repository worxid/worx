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
        List<DashboardStatDTO> responses = new ArrayList<>();

        List<LocalDate> totalDates = new ArrayList<>();
        while (!from.isAfter(to)) {
            totalDates.add(from);
            from = from.plusDays(1);
        }
        String deviceCode;

        for(LocalDate dateList:totalDates){
            Instant startDate = Instant.parse(dateList+"T00:00:01Z");
            Instant endDate = Instant.parse(dateList+"T23:59:59Z");

            if(dashboardRequest.getFormId() != null && dashboardRequest.getDeviceId() != null){
                Optional<Device> getDeviceCode = deviceRepository.findById(dashboardRequest.getDeviceId());
                if(getDeviceCode.isPresent()){
                    Device device = getDeviceCode.get();
                    deviceCode = device.getDeviceCode();
                }else{
                    deviceCode = "";
                }
                Integer count = formRepository.getCountByRespondentDeviceAndTemplateId(startDate,endDate,deviceCode, dashboardRequest.getFormId());

                DashboardStatDTO dashboardStatDTO = new DashboardStatDTO();
                dashboardStatDTO.setCount(count);
                dashboardStatDTO.setDate(dateList);
                responses.add(dashboardStatDTO);
            }else if(dashboardRequest.getFormId() == null && dashboardRequest.getDeviceId() != null){
                Optional<Device> getDeviceCode = deviceRepository.findById(dashboardRequest.getDeviceId());
                if(getDeviceCode.isPresent()){
                    Device device = getDeviceCode.get();
                    deviceCode = device.getDeviceCode();
                }else{
                    deviceCode = "";
                }
                Integer count = formRepository.getCountByRespondentDevice(startDate,endDate,deviceCode);

                DashboardStatDTO dashboardStatDTO = new DashboardStatDTO();
                dashboardStatDTO.setCount(count);
                dashboardStatDTO.setDate(dateList);
                responses.add(dashboardStatDTO);
            }else if(dashboardRequest.getFormId() != null && dashboardRequest.getDeviceId() == null){
                Integer count = formRepository.getCountByTemplateId(startDate,endDate,dashboardRequest.getFormId());

                DashboardStatDTO dashboardStatDTO = new DashboardStatDTO();
                dashboardStatDTO.setCount(count);
                dashboardStatDTO.setDate(dateList);
                responses.add(dashboardStatDTO);
            }else{
                Integer count = formRepository.getCountByDateOnly(startDate,endDate);

                DashboardStatDTO dashboardStatDTO = new DashboardStatDTO();
                dashboardStatDTO.setCount(count);
                dashboardStatDTO.setDate(dateList);
                responses.add(dashboardStatDTO);
            }

        }

        return responses;
    }
}
