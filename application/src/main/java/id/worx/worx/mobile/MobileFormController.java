package id.worx.worx.mobile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.data.request.FormSubmitRequest;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.entity.Form;
import id.worx.worx.service.FormService;
import id.worx.worx.service.FormTemplateService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("mobile/forms")
@RequiredArgsConstructor
public class MobileFormController {

    private final FormService formService;
    private final FormTemplateService templateService;

    @PostMapping("submit")
    public ResponseEntity<BaseValueResponse<FormDTO>> submit(
            @RequestHeader(value = "device-code", required = false) String deviceCode,
            @RequestBody FormSubmitRequest request) {
        Form form = formService.submit(request);
        FormDTO dto = formService.toDTO(form);
        BaseValueResponse<FormDTO> response = BaseValueResponse.<FormDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

}
