package id.worx.worx.service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.data.dto.LocationDTO;
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
import id.worx.worx.web.request.FormSubmissionSearchRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FormServiceImpl implements FormService {

    private final FormRepository formRepository;
    private final FormTemplateRepository templateRepository;

    private final ObjectMapper objectMapper;

    private final FormMapper formMapper;

    @Override
    public Page<Form> search(FormSubmissionSearchRequest request, Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Form submit(FormSubmitRequest request) {
        // TODO Auto-generated method stub

        // validate template
        Optional<FormTemplate> optTemplate = templateRepository.findById(request.getTemplateId());

        if (optTemplate.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        // validate field value
        List<Field> fields = request.getFields();
        Map<String, Value> values = request.getValues();

        List<Boolean> validations = fields.stream()
                .map(field -> {
                    Value value = values.get(field.getId());
                    log.info("{} is {}", field.getId(), field.validate(value));
                    return field.validate(value);
                })
                .collect(Collectors.toList());

        if (validations.stream().anyMatch(e -> e.equals(Boolean.FALSE))) {
            throw new WorxException(
                    "The submission is invalid",
                    HttpStatus.BAD_REQUEST.value());
        }

        String fieldsString = "[]";
        String valuesString = "{}";

        try {
            fieldsString = objectMapper.writeValueAsString(fields);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            valuesString = objectMapper.writeValueAsString(values);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        Form form = Form.builder()
                .templateId(request.getTemplateId())
                .label(request.getLabel())
                .description(request.getDescription())
                .fields(fieldsString)
                .values(valuesString)
                .submitInZone(request.getSubmitInZone())
                .build();

        LocationDTO location = request.getSubmitLocation();

        if (Objects.nonNull(location)) {
            form.setSubmitAddress(location.getAddress());
            form.setSubmitLat(location.getLat());
            form.setSubmitLng(location.getLng());
        }

        form.setRespondentType(RespondentType.WEB_BROWSER);

        form = formRepository.save(form);
        return form;
    }

    @Override
    public Form submit(MobileFormSubmitRequest request) {
        Optional<FormTemplate> optTemplate = templateRepository.findById(request.getTemplateId());

        if (optTemplate.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        // TODO validate device code

        // validate field value
        List<Field> fields = request.getFields();
        Map<String, Value> values = request.getValues();

        List<Boolean> validations = fields.stream()
                .map(field -> {
                    Value value = values.get(field.getId());
                    log.info("{} is {}", field.getId(), field.validate(value));
                    return field.validate(value);
                })
                .collect(Collectors.toList());

        if (validations.stream().anyMatch(e -> e.equals(Boolean.FALSE))) {
            throw new WorxException(
                    "The submission is invalid",
                    HttpStatus.BAD_REQUEST.value());
        }

        String fieldsString = "[]";
        String valuesString = "{}";

        try {
            fieldsString = objectMapper.writeValueAsString(fields);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            valuesString = objectMapper.writeValueAsString(values);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        Form form = Form.builder()
                .templateId(request.getTemplateId())
                .label(request.getLabel())
                .description(request.getDescription())
                .fields(fieldsString)
                .values(valuesString)
                .submitInZone(request.getSubmitInZone())
                .build();

        LocationDTO location = request.getSubmitLocation();

        if (Objects.nonNull(location)) {
            form.setSubmitAddress(location.getAddress());
            form.setSubmitLat(location.getLat());
            form.setSubmitLng(location.getLng());
        }

        // TODO set respondent label with device label
        form.setRespondentType(RespondentType.MOBILE_APP);
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

}
