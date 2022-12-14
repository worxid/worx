package id.worx.worx.web.controller;

import java.io.ByteArrayOutputStream;

import javax.validation.Valid;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.service.report.FormExportService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("report")
@RequiredArgsConstructor
public class ReportController implements SecuredRestController {

    private final FormExportService formExportService;

    @PostMapping("export")
    public ResponseEntity<ByteArrayResource> exportTest(@RequestBody @Valid ReportRequest request) {
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
