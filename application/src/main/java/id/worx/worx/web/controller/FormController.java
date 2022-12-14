package id.worx.worx.web.controller;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import id.worx.worx.common.model.dto.SearchFormDTO;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.request.FormSubmitRequest;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.common.model.response.BasePageResponse;
import id.worx.worx.entity.Form;
import id.worx.worx.service.FormService;
import id.worx.worx.service.report.FormExportService;
import id.worx.worx.web.model.request.FormExportRequest;
import id.worx.worx.web.model.request.FormSearchRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("form")
@RequiredArgsConstructor
public class FormController implements SecuredRestController {

        private final FormService formService;
        private final FormExportService formExportService;

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
        public ResponseEntity<Page<SearchFormDTO>> search(
                        @RequestBody @Valid FormSearchRequest request,
                        @ParameterObject Pageable pageable) {
                Page<Form> forms = formService.search(request, pageable);
                List<SearchFormDTO> dtos = forms.stream()
                                .map(formService::toSearchFormDTO)
                                .collect(Collectors.toList());
                Page<SearchFormDTO> page = new BasePageResponse<>(dtos, forms.getPageable(), forms.getTotalElements());
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

        @GetMapping("/{id}")
        public ResponseEntity<BaseValueResponse<FormDTO>> getById(@PathVariable("id") Long id) {
                Form form = formService.getById(id);
                FormDTO formDTO = formService.toDTO(form);
                BaseValueResponse<FormDTO> response = BaseValueResponse.<FormDTO>builder()
                                .value(formDTO)
                                .build();
                return ResponseEntity.ok(response);
        }

        @PostMapping("export")
        public ResponseEntity<ByteArrayResource> exportTest(@RequestBody @Valid FormExportRequest request) {
                ByteArrayOutputStream reportByte = formExportService.saveFormAsPDF(request.getFormId());
                String filename = "forms.docx";

                ByteArrayResource resource = new ByteArrayResource(reportByte.toByteArray());
                HttpHeaders header = new HttpHeaders();
                header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
                header.add("Cache-Control", "no-cache, no-store, must-revalidate");
                header.add("Pragma", "no-cache");
                header.add("Expires", "0");

                return ResponseEntity.status(HttpStatus.OK)
                                .headers(header)
                                .contentLength(reportByte.size())
                                .contentType(MediaType.parseMediaType("application/octet-stream"))
                                .body(resource);
        }

}
