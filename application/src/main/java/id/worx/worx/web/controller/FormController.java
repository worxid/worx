package id.worx.worx.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.data.request.FormSubmitRequest;
import id.worx.worx.data.response.BaseListResponse;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.entity.Form;
import id.worx.worx.service.FormService;
import id.worx.worx.web.model.FormSubmissionSearchRequest;
import id.worx.worx.web.pageable.SimplePage;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("form")
@RequiredArgsConstructor
public class FormController {

    private final FormService formService;

    @GetMapping("list")
    public ResponseEntity<BaseListResponse<FormDTO>> list() {
        List<Form> forms = formService.list();
        List<FormDTO> dtos = forms.stream()
                .map(formService::toDTO)
                .collect(Collectors.toList());
        BaseListResponse<FormDTO> response = BaseListResponse.<FormDTO>builder()
                .list(dtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("search")
    public ResponseEntity<Page<FormDTO>> search(
            @RequestBody @Valid FormSubmissionSearchRequest request,
            @ParameterObject Pageable pageable) {
        Page<Form> forms = formService.search(request, pageable);
        List<FormDTO> dtos = forms.stream()
                .map(formService::toDTO)
                .collect(Collectors.toList());
        Page<FormDTO> page = new SimplePage<>(dtos, forms.getPageable(), forms.getTotalElements());
        return ResponseEntity.status(HttpStatus.OK)
                .body(page);
    }

    @PostMapping("submit")
    public ResponseEntity<BaseValueResponse<FormDTO>> submit(
            HttpServletRequest httpServletRequest,
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
