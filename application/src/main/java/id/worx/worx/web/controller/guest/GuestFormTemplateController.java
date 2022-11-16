package id.worx.worx.web.controller.guest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.data.dto.LinkFormDTO;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.service.FormTemplateService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("guest/form/template")
@RequiredArgsConstructor
public class GuestFormTemplateController {

    private final FormTemplateService templateService;

    @GetMapping("read")
    public ResponseEntity<BaseValueResponse<FormTemplateDTO>> read(@RequestParam String code) {
        FormTemplate template = templateService.read(code);
        FormTemplateDTO dto = templateService.toDTO(template);
        BaseValueResponse<FormTemplateDTO> response = BaseValueResponse.<FormTemplateDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("share")
    public ResponseEntity<BaseValueResponse<LinkFormDTO>> getShareLinkForm(@RequestParam String code) {
        FormTemplate template = templateService.read(code);
        LinkFormDTO dto = templateService.generateLink(template);
        BaseValueResponse<LinkFormDTO> response = BaseValueResponse.<LinkFormDTO>builder()
                .value(dto)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

}
