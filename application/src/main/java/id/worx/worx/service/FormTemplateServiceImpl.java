package id.worx.worx.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.data.dto.FormTemplateSearchDTO;
import id.worx.worx.data.request.FormTemplateRequest;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.Group;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.util.UrlUtils;
import id.worx.worx.web.pageable.SimplePage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FormTemplateServiceImpl implements FormTemplateService {

    private final EmailService emailService;

    private final FormTemplateRepository templateRepository;
    private final GroupRepository groupRepository;

    private final FormTemplateMapper templateMapper;

    @Override
    public Page<FormTemplateSearchDTO> search(Pageable pageable) {
        Page<FormTemplate> templates = templateRepository.findAll(pageable);
        List<FormTemplateSearchDTO> dtos = templates.stream()
                .map(templateMapper::toSearchDTO)
                .collect(Collectors.toList());
        return new SimplePage<>(dtos, templates.getPageable(), templates.getTotalElements());
    }

    @Override
    public List<FormTemplate> list() {
        return templateRepository.findAll();
    }

    @Override
    public FormTemplate create(FormTemplateRequest request) {
        FormTemplate template = templateMapper.fromDTO(request);
        String urlCode = UrlUtils.generateUrlCode();
        template.setUrlCode(urlCode);
        templateRepository.save(template);
        return template;
    }

    @Override
    public FormTemplate read(Long id) {
        return this.findByIdorElseThrowNotFound(id);
    }

    @Override
    public FormTemplate read(String code) {
        return this.findByUrlCodeorElseThrowNotFound(code);
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

    @Transactional
    @Override
    public FormTemplate assignGroup(Long id, List<Long> groupIds) {
        FormTemplate template = this.findByIdorElseThrowNotFound(id);
        List<Group> groups = groupRepository.findAllById(groupIds);
        template.setAssignedGroups(new HashSet<>());
        groups = groups.stream()
                .map(group -> {
                    template.getAssignedGroups().add(group);
                    group.getTemplates().add(template);
                    return group;
                })
                .collect(Collectors.toList());

        groupRepository.saveAll(groups);
        templateRepository.save(template);
        return template;
    }

    @Override
    public void share(FormTemplate template, List<String> recipients) {
        String code = template.getUrlCode();

        for (String recipient : recipients) {
            emailService.sendShareFormEmail(recipient, code);
        }

    }

    private FormTemplate findByIdorElseThrowNotFound(Long id) {
        Optional<FormTemplate> template = templateRepository.findById(id);

        if (template.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        return template.get();
    }

    private FormTemplate findByUrlCodeorElseThrowNotFound(String urlCode) {
        Optional<FormTemplate> template = templateRepository.findByUrlCode(urlCode);

        if (template.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        return template.get();
    }

}
