package id.worx.worx.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.data.request.SubmitRequest;
import id.worx.worx.data.response.FormResponse;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;
import id.worx.worx.service.FormTemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("demo/form")
@RequiredArgsConstructor
public class FormController {

    // demo/form/list
    @GetMapping("list")
    public ResponseEntity<FormResponse> list() {
        FormResponse response = FormResponse.builder()
                .fields(null)
                .values(null)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    // demo/form/submit
    @PostMapping("submit")
    public ResponseEntity<String> submit(@RequestBody SubmitRequest request) {

        List<Field> fields = request.getFields();
        Map<String, Value> values = request.getValues();

        for (Field field : fields) {
            Value value = values.get(field.getId());
            log.debug("validate field >>> " + field.getType().getText());
            log.debug("result >>> " + field.validate(value));
        }
        List<Boolean> validations = fields.stream()
                .map(field -> {
                    Value value = values.get(field.getId());
                    return field.validate(value);
                })
                .collect(Collectors.toList());

        if (validations.stream().anyMatch(e -> e.equals(Boolean.FALSE))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("The submission is invalid");
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body("The submission is OK");
    }

}
