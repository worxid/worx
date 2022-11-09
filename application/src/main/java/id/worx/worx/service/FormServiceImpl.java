package id.worx.worx.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.field.FileField;
import id.worx.worx.common.model.forms.field.PhotoField;
import id.worx.worx.common.model.forms.field.SignatureField;
import id.worx.worx.common.model.forms.value.FileValue;
import id.worx.worx.common.model.forms.value.PhotoValue;
import id.worx.worx.common.model.forms.value.SignatureValue;
import id.worx.worx.common.model.forms.value.Value;
import id.worx.worx.common.model.request.FormSubmitRequest;
import id.worx.worx.entity.File;
import id.worx.worx.entity.FileSubmission;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.RespondentType;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.mobile.model.MobileFormSubmitRequest;
import id.worx.worx.repository.FileRepository;
import id.worx.worx.repository.FileSubmissionRepository;
import id.worx.worx.repository.FormRepository;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.service.specification.FormSpecification;
import id.worx.worx.service.storage.FileStorageService;
import id.worx.worx.web.model.request.FormSubmissionSearchRequest;
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

    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;
    private final FileSubmissionRepository fileSubmissionRepository;
    private final AuthenticationContext authContext;

    @Override
    public Page<Form> search(FormSubmissionSearchRequest request, Pageable pageable) {
        Specification<Form> spec = specification.fromSearchRequest(request,authContext.getUsers().getId());
        return formRepository.findAll(spec, pageable);
    }

    @Override
    public Form submit(FormSubmitRequest request) {
        Form form = this.submitOrElseThrowInvalid(request);
        form.setRespondentType(RespondentType.WEB_BROWSER);
        form.setRespondentLabel(RespondentType.WEB_BROWSER.getName());
        // TODO set respondent IP ?
        form.setRespondentIP("0.0.0.0");

        form = formRepository.save(form);
        updateFileState(form, request.getFields(), request.getValues());
        return form;
    }

    @Override
    public Form submit(MobileFormSubmitRequest request) {
        // TODO validate device code
        Form form = this.submitOrElseThrowInvalid(request);
        // TODO set respondent label with device label
        form.setRespondentType(RespondentType.MOBILE_APP);
        form.setRespondentLabel(RespondentType.MOBILE_APP.getName());
        form.setRespondentDeviceCode(request.getDeviceCode());

        form = formRepository.save(form);
        updateFileState(form, request.getFields(), request.getValues());
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
        Optional<FormTemplate> optTemplate = templateRepository.findById(request.getTemplateId());

        if (optTemplate.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        FormTemplate template = optTemplate.get();
        List<Field> fields = request.getFields();
        Map<String, Value> values = request.getValues();

        List<ErrorDetail> validations = validate(fields, values);
        validations.addAll(validateFieldWithFile(fields, values));
        if (!validations.isEmpty()) {
            throw new WorxException(WorxErrorCode.FORM_VALIDATION_ERROR, validations);
        }

        Form form = formMapper.fromSubmitRequest(request);
        form.setTemplate(template);
        form.setSubmitDate(Instant.now());

        return form;
    }

    private List<ErrorDetail> validate(List<Field> fields, Map<String, Value> values) {
        List<ErrorDetail> details = new ArrayList<>();
        details.addAll(fields.stream()
                .map(field -> {
                    Value value = values.get(field.getId());
                    log.info(field.getId());
                    log.info("{}", value);
                    return field.validate(value);
                })
                .flatMap(Collection::stream)
                .collect(Collectors.toList()));
        return details;
    }

    private List<ErrorDetail> validateFieldWithFile(List<Field> fields, Map<String, Value> values) {
        List<ErrorDetail> details = new ArrayList<>();

        List<Field> signatureFields = fields.stream()
                .filter(SignatureField.class::isInstance)
                .filter(field -> values.containsKey(field.getId()))
                .collect(Collectors.toList());

        for (Field field : signatureFields) {
            Value value = values.get(field.getId());
            SignatureValue signatureValue = (SignatureValue) value;
            Long fileId = signatureValue.getFileId();
            List<ErrorDetail> fileValidations = this.validateFile(field.getId(), fileId);
            details.addAll(fileValidations);
        }

        List<Field> fileFields = fields.stream()
                .filter(FileField.class::isInstance)
                .filter(field -> values.containsKey(field.getId()))
                .collect(Collectors.toList());

        for (Field field : fileFields) {
            Value value = values.get(field.getId());
            FileValue fileValue = (FileValue) value;
            List<Long> fileIds = fileValue.getFileIds();
            for (Long fileId : fileIds) {
                List<ErrorDetail> fileValidations = this.validateFile(field.getId(), fileId);
                details.addAll(fileValidations);
            }
        }

        List<Field> photoFields = fields.stream()
                .filter(PhotoField.class::isInstance)
                .filter(field -> values.containsKey(field.getId()))
                .collect(Collectors.toList());

        for (Field field : photoFields) {
            Value value = values.get(field.getId());
            PhotoValue photoValue = (PhotoValue) value;
            List<Long> fileIds = photoValue.getFileIds();
            for (Long fileId : fileIds) {
                List<ErrorDetail> fileValidations = this.validateFile(field.getId(), fileId);
                details.addAll(fileValidations);
            }
        }

        return details;
    }

    private List<ErrorDetail> validateFile(String fieldId, Long fileId) {
        List<ErrorDetail> details = new ArrayList<>();

        Optional<File> optFile = fileRepository.findById(fileId);

        if (optFile.isEmpty()) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FILE_STATE, fieldId));
            return details;
        }

        File file = optFile.get();
        if (!fileStorageService.isObjectExist(file.getPath())) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FILE_STATE, fieldId));
            return details;
        }

        Optional<FileSubmission> fileSubmission = fileSubmissionRepository.findByFile(file);
        if (fileSubmission.isPresent()) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FILE_SUBMISSION, fieldId));
            return details;
        }

        // TODO validate min size
        // TODO validate max size
        // TODO validate allowed extension

        return details;
    }

    private void updateFileState(Form form, List<Field> fields, Map<String, Value> values) {
        List<Field> signatureFields = fields.stream()
                .filter(SignatureField.class::isInstance)
                .filter(field -> values.containsKey(field.getId()))
                .collect(Collectors.toList());

        for (Field field : signatureFields) {
            Value value = values.get(field.getId());
            SignatureValue signatureValue = (SignatureValue) value;
            Long fileId = signatureValue.getFileId();
            updateFileStateHelper(form, fileId, field.getId());
        }

        List<Field> fileFields = fields.stream()
                .filter(FileField.class::isInstance)
                .filter(field -> values.containsKey(field.getId()))
                .collect(Collectors.toList());

        for (Field field : fileFields) {
            Value value = values.get(field.getId());
            FileValue fileValue = (FileValue) value;
            List<Long> fileIds = fileValue.getFileIds();
            for (Long fileId : fileIds) {
                updateFileStateHelper(form, fileId, field.getId());
            }
        }

        List<Field> photoFields = fields.stream()
                .filter(PhotoField.class::isInstance)
                .filter(field -> values.containsKey(field.getId()))
                .collect(Collectors.toList());

        for (Field field : photoFields) {
            Value value = values.get(field.getId());
            PhotoValue photoValue = (PhotoValue) value;
            List<Long> fileIds = photoValue.getFileIds();
            for (Long fileId : fileIds) {
                updateFileStateHelper(form, fileId, field.getId());
            }
        }

    }

    private void updateFileStateHelper(Form form, Long fileId, String fieldId) {
        Optional<File> optFile = fileRepository.findById(fileId);
        if (optFile.isEmpty()) {
            return;
        }

        File file = optFile.get();
        updateFileSize(file);

        FileSubmission fileSubmission = FileSubmission.builder()
                .file(file)
                .form(form)
                .fieldId(fieldId)
                .isSubmitted(true)
                .build();

        fileSubmissionRepository.save(fileSubmission);
    }

    private void updateFileSize(File file) {
        long fileSize = fileStorageService.getObjectSize(file.getPath());
        file.setSize(fileSize);
        fileRepository.save(file);
    }

}