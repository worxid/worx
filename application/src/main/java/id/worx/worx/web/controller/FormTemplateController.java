package id.worx.worx.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.data.request.FormShareRequest;
import id.worx.worx.data.request.FormTemplateAssignGroupRequest;
import id.worx.worx.data.request.FormTemplateRequest;
import id.worx.worx.data.response.BaseListResponse;
import id.worx.worx.data.response.BaseResponse;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.service.FormTemplateService;
import id.worx.worx.web.pageable.SimplePage;
import id.worx.worx.web.request.FormTemplateSearchRequest;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("form/template")
@RequiredArgsConstructor
public class FormTemplateController {

    private final FormTemplateService templateService;

    @PostMapping("search")
    public ResponseEntity<Page<FormTemplateDTO>> search(
            @RequestBody @Valid FormTemplateSearchRequest request,
            @ParameterObject Pageable pageable) {
        Page<FormTemplate> templates = templateService.search(request, pageable);
        List<FormTemplateDTO> dtos = templates.stream()
                .map(templateService::toDTO)
                .collect(Collectors.toList());
        Page<FormTemplateDTO> page = new SimplePage<>(dtos, templates.getPageable(), templates.getTotalElements());
        return ResponseEntity.status(HttpStatus.OK)
                .body(page);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Form Template is created.")
    })
    @PostMapping
    public ResponseEntity<BaseValueResponse<FormTemplateDTO>> create(
            @RequestBody @Valid FormTemplateRequest request) {
        FormTemplate template = templateService.create(request);
        FormTemplateDTO dto = templateService.toDTO(template);
        BaseValueResponse<FormTemplateDTO> response = BaseValueResponse.<FormTemplateDTO>builder()
                .value(dto)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<BaseListResponse<FormTemplateDTO>> list() {
        List<FormTemplate> templates = templateService.list();
        List<FormTemplateDTO> list = templates.stream()
                .map(templateService::toDTO)
                .collect(Collectors.toList());
        BaseListResponse<FormTemplateDTO> response = BaseListResponse.<FormTemplateDTO>builder()
                .list(list)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<BaseValueResponse<FormTemplateDTO>> read(@PathVariable("id") Long id) {
        FormTemplate template = templateService.read(id);
        FormTemplateDTO dto = templateService.toDTO(template);
        BaseValueResponse<FormTemplateDTO> response = BaseValueResponse.<FormTemplateDTO>builder()
                .value(dto)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

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

    @PutMapping("{id}")
    public ResponseEntity<BaseValueResponse<FormTemplateDTO>> update(@PathVariable("id") Long id,
            @RequestBody @Valid FormTemplateRequest request) {
        FormTemplate template = templateService.update(id, request);
        FormTemplateDTO dto = templateService.toDTO(template);
        BaseValueResponse<FormTemplateDTO> response = BaseValueResponse.<FormTemplateDTO>builder()
                .value(dto)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Form Template is deleted.")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable("id") Long id) {
        templateService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(BaseResponse.builder().build());
    }

    @PutMapping("{id}/assign")
    public ResponseEntity<BaseValueResponse<FormTemplateDTO>> assignGroup(@PathVariable("id") Long id,
            @RequestBody @Valid FormTemplateAssignGroupRequest request) {

        FormTemplate template = templateService.assignGroup(id, request.getAssignedGroups());
        FormTemplateDTO dto = templateService.toDTO(template);
        BaseValueResponse<FormTemplateDTO> response = BaseValueResponse.<FormTemplateDTO>builder()
                .value(dto)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("{id}/share")
    public ResponseEntity<BaseResponse> shareFormToEmail(@PathVariable("id") Long id,
            @RequestBody @Valid FormShareRequest request) {

        FormTemplate template = templateService.read(id);
        templateService.share(template, request.getRecipients());
        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponse.builder().build());
    }

}
