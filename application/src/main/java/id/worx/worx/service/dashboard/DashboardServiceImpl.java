package id.worx.worx.service.dashboard;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import id.worx.worx.common.model.dto.DashboardStatMapDTO;
import id.worx.worx.common.model.request.DashboardRequest;
import id.worx.worx.data.dto.DashboardStat;
import id.worx.worx.data.dto.DashboardStatDTO;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.FormRepository;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.specification.FormSpecification;
import id.worx.worx.web.model.request.FormSubmissionSearchRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DeviceRepository deviceRepository;
    private final FormSpecification specification;
    private final FormRepository formRepository;
    private final AuthenticationContext authContext;
    private final FormMapper formMapper;

    @Override
    public List<DashboardStatDTO> getDashboardStat(LocalDate from, LocalDate to, DashboardRequest request) {
        String deviceCode = null;
        if (request.getDeviceId() != null) {
            Device device = deviceRepository.findById(request.getDeviceId())
                    .orElseThrow(() -> new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR));
            deviceCode = device.getDeviceCode();
        }

        List<DashboardStat> dashboardStatList = formRepository.getDasboardStat(from, to, deviceCode,
                request.getTemplateId(),authContext.getUsers().getId());
        List<DashboardStatDTO> response = new ArrayList<>();

        for (DashboardStat data : dashboardStatList) {

            DashboardStatDTO dashboardStatDTO = new DashboardStatDTO();
            dashboardStatDTO.setDate(data.getDates());
            dashboardStatDTO.setCount(data.getTotalCount());

            response.add(dashboardStatDTO);
        }

        return response;
    }

    @Override
    public List<DashboardStatMapDTO> getDashboardStatMap(LocalDate from, LocalDate to, DashboardRequest request) {
        FormSubmissionSearchRequest searchRequest = FormSubmissionSearchRequest.builder()
                .templateId(request.getTemplateId())
                .from(from.atStartOfDay(ZoneId.of("UTC")).toInstant())
                .to(to.atTime(23,59,59).atZone(ZoneId.of("UTC")).toInstant())
                .build();
        String deviceCode = null;
        if (request.getDeviceId() != null) {
            Device device = deviceRepository.findByIdAndDeleted(request.getDeviceId(), false)
                    .orElseThrow(() -> new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR));
            deviceCode = device.getDeviceCode();
        }
        List<Form> forms = listFormFilter(searchRequest, deviceCode);
        return forms.stream().map(formMapper::toDashboardMapDTO).collect(Collectors.toList());
    }

    public List<Form> listFormFilter(FormSubmissionSearchRequest request, String deviceCode) {
        Specification<Form> spec = specification.fromSearchRequest(request, authContext.getUsers().getId(), deviceCode);
        return formRepository.findAll(spec);
    }

}
