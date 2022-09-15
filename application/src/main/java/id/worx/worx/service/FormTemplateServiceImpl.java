package id.worx.worx.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.data.request.FormTemplateRequest;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.FormTemplateRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FormTemplateServiceImpl implements FormTemplateService {

    private final FormTemplateRepository templateRepository;

    private final FormTemplateMapper templateMapper;

    @Override
    public List<FormTemplate> list() {
        return templateRepository.findAll();
    }

    @Override
    public FormTemplate create(FormTemplateRequest request) {
        FormTemplate template = templateMapper.fromDTO(request);
        templateRepository.save(template);
        return template;
    }

    @Override
    public FormTemplate read(Long id) {
        return this.findByIdorElseThrowNotFound(id);
    }

    @Override
    public FormTemplate update(Long id, FormTemplateRequest request) {
        FormTemplate template = this.findByIdorElseThrowNotFound(id);
        templateMapper.update(template, request);
        templateRepository.save(template);
        return template;
    }

    @Override
    public void delete(Long id) {
        FormTemplate template = this.findByIdorElseThrowNotFound(id);
        templateRepository.delete(template);
    }

    @Override
    public FormTemplateDTO toDTO(FormTemplate template) {
        return templateMapper.toDto(template);
    }

    private FormTemplate findByIdorElseThrowNotFound(Long id) {
        Optional<FormTemplate> template = templateRepository.findById(id);

        if (template.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        return template.get();
    }

}
