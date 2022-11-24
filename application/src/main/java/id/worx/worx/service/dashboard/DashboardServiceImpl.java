package id.worx.worx.service.dashboard;

import id.worx.worx.common.model.dto.DashboardStatMapDTO;
import id.worx.worx.common.model.request.DashboardRequest;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.service.FormService;
import id.worx.worx.web.model.request.FormSubmissionSearchRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService{

    private final DeviceRepository deviceRepository;
    private final FormService formService;
    private final FormMapper formMapper;

    @Override
    public List<DashboardStatMapDTO> getDashboardStatMap(LocalDate from, LocalDate to, DashboardRequest request) {
        FormSubmissionSearchRequest searchRequest=FormSubmissionSearchRequest.builder()
            .templateId(request.getTemplateId())
            .from(from.atStartOfDay(ZoneId.of("UTC")).toInstant())
            .to(to.atStartOfDay(ZoneId.of("UTC")).toInstant())
            .build();
        String deviceCode=null;
        if(request.getDeviceId()!=null){
            Device device= deviceRepository.findByIdAndDeleted(request.getDeviceId(),false).orElseThrow(()-> new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR));
            deviceCode=device.getDeviceCode();
        }
        List<Form> forms= formService.listFormFilter(searchRequest,deviceCode);
        return forms.stream().map(form-> formMapper.toDashboardMapDTO(form)).collect(Collectors.toList());
    }
}
