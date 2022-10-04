package id.worx.worx.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.data.response.BaseListResponse;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.model.MobileFormDTO;
import id.worx.worx.model.MobileFormSubmitRequest;
import id.worx.worx.model.MobileFormTemplateDTO;
import id.worx.worx.service.FormService;
import id.worx.worx.service.FormTemplateService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("mobile/forms")
@RequiredArgsConstructor
public class MobileFormController {

    private final FormService formService;
    private final FormTemplateService templateService;

    private final FormMapper formMapper;
    private final FormTemplateMapper templateMapper;

    @PostMapping("submit")
    public ResponseEntity<BaseValueResponse<FormDTO>> submit(
            @RequestHeader(value = "device-code") String deviceCode,
            @RequestBody @Valid MobileFormSubmitRequest request) {
        request.setDeviceCode(deviceCode);
        Form form = formService.submit(request);
        FormDTO dto = formService.toDTO(form);
        BaseValueResponse<FormDTO> response = BaseValueResponse.<FormDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<BaseListResponse<MobileFormTemplateDTO>> list(
            @RequestHeader(value = "device-code") String deviceCode) {
        // TODO filter by device code
        List<FormTemplate> templates = templateService.list();
        List<MobileFormTemplateDTO> list = templates.stream()
                .map(templateMapper::toMobileDTO)
                .collect(Collectors.toList());
        BaseListResponse<MobileFormTemplateDTO> response = BaseListResponse.<MobileFormTemplateDTO>builder()
                .list(list)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("submissions")
    public ResponseEntity<BaseListResponse<MobileFormDTO>> submissionList(
            @RequestHeader(value = "device-code") String deviceCode) {
        List<Form> forms = formService.list(deviceCode);
        List<MobileFormDTO> list = forms.stream()
                .map(formMapper::toMobileDTO)
                .collect(Collectors.toList());
        BaseListResponse<MobileFormDTO> response = BaseListResponse.<MobileFormDTO>builder()
                .list(list)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

}
