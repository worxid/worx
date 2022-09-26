package id.worx.worx.service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.data.request.FormSubmitRequest;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.RespondentType;
import id.worx.worx.exception.WorxException;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.mobile.model.MobileFormSubmitRequest;
import id.worx.worx.repository.FormRepository;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.service.specification.FormSpecification;
import id.worx.worx.web.model.FormSubmissionSearchRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FormServiceImpl implements FormService {

    private final FormRepository formRepository;
    private final FormTemplateRepository templateRepository;

    private final FormMapper formMapper;

    private final FormSpecification specification;

    @Override
    public Page<Form> search(FormSubmissionSearchRequest request, Pageable pageable) {
        Specification<Form> spec = specification.fromSearchRequest(request);
        return formRepository.findAll(spec, pageable);
    }

    @Override
    public Form submit(FormSubmitRequest request) {
        Optional<FormTemplate> optTemplate = templateRepository.findById(request.getTemplateId());

        if (optTemplate.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        Form form = this.submitOrElseThrowInvalid(request);
        form.setRespondentType(RespondentType.WEB_BROWSER);
        form.setRespondentLabel(RespondentType.WEB_BROWSER.getName());
        // TODO set respondent IP ?
        form.setRespondentIP("0.0.0.0");

        form = formRepository.save(form);
        return form;
    }

    @Override
    public Form submit(MobileFormSubmitRequest request) {
        // TODO validate device code

        Optional<FormTemplate> optTemplate = templateRepository.findById(request.getTemplateId());

        if (optTemplate.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        Form form = this.submitOrElseThrowInvalid(request);
        // TODO set respondent label with device label
        form.setRespondentType(RespondentType.MOBILE_APP);
        form.setRespondentLabel(RespondentType.MOBILE_APP.getName());
        form.setRespondentDeviceCode(request.getDeviceCode());

        form = formRepository.save(form);
        return form;
    }

    @Override
    public List<Form> list() {
        return formRepository.findAll();
    }

    @Override
    public List<Form> list(String deviceCode) {
        return formRepository.findAllByRespondentDeviceCode(deviceCode);
    }

    @Override
    public FormDTO toDTO(Form form) {
        return formMapper.toDTO(form);
    }

    private Form submitOrElseThrowInvalid(FormSubmitRequest request) {
        List<Field> fields = request.getFields();
        Map<String, Value> values = request.getValues();

        List<Boolean> validations = validate(fields, values);
        if (validations.stream().anyMatch(e -> e.equals(Boolean.FALSE))) {
            throw new WorxException(
                    "The submission is invalid",
                    HttpStatus.BAD_REQUEST.value());
        }

        Form form = formMapper.fromSubmitRequest(request);
        form.setSubmitDate(Instant.now());
        return form;
    }

    private List<Boolean> validate(List<Field> fields, Map<String, Value> values) {
        return fields.stream()
                .map(field -> {
                    Value value = values.get(field.getId());
                    log.info("{} is {}", field.getId(), field.validate(value));
                    return field.validate(value);
                })
                .collect(Collectors.toList());
    }

}
