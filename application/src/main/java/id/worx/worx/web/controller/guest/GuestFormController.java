package id.worx.worx.web.controller.guest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.request.FormSubmitRequest;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.entity.Form;
import id.worx.worx.service.FormService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("guest/form")
@RequiredArgsConstructor
public class GuestFormController {

    private final FormService formService;

    @PostMapping("submit")
    public ResponseEntity<BaseValueResponse<FormDTO>> submit(@RequestBody FormSubmitRequest request) {
        Form form = formService.submit(request);
        FormDTO dto = formService.toDTO(form);
        BaseValueResponse<FormDTO> response = BaseValueResponse.<FormDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

}
