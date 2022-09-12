package id.worx.worx.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.data.request.FormRequest;
import id.worx.worx.data.request.FormTemplateCreationDTO;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.field.SeparatorField;
import id.worx.worx.forms.service.field.TextField;
import id.worx.worx.service.FormTemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// TODO Remove from demo path

@Slf4j
@RestController
@RequestMapping
@RequiredArgsConstructor
public class FormTemplateController {

    private final FormTemplateService formTemplateService;

    // form/template

    // form/template/list
    @GetMapping("demo/form/template/list")
    public ResponseEntity<?> list() {
        List<Field> fields = formTemplateService.getSampleFieldList();

        return ResponseEntity.status(HttpStatus.OK)
                .body(fields);
    }

    @PostMapping("demo/form/template/search")
    public ResponseEntity<?> search(@RequestBody FormRequest request) {

        List<Field> fields = request.getFields();
        Field field = fields.get(0);

        if (field instanceof TextField) {
            log.info("this marker is Textfield");
        }

        if (field instanceof SeparatorField) {
            log.info("this marker is CheckboxGroupField");
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(fields);
    }

    // form/template/create
    @PostMapping("form/template")
    public ResponseEntity<?> create(FormTemplateCreationDTO request) {
        FormTemplate formTemplate = formTemplateService.create(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(formTemplate);
    }

    // form/template/read
    public ResponseEntity<?> read() {

        return null;
    }

    // form/template/update
    public ResponseEntity<?> update() {

        return null;
    }

    // form/template/delete
    public ResponseEntity<?> delete() {

        return null;
    }

}
