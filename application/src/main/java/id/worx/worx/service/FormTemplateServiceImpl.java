package id.worx.worx.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.Group;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.service.specification.FormTemplateSpecification;
import id.worx.worx.util.UrlUtils;
import id.worx.worx.web.model.request.FormTemplateSearchRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FormTemplateServiceImpl implements FormTemplateService {

    private final EmailService emailService;

    private final FormTemplateRepository templateRepository;
    private final GroupRepository groupRepository;

    private final FormTemplateMapper templateMapper;

    private final FormTemplateSpecification specification;

    private final AuthenticationContext authContext;

    @Override
    public Page<FormTemplate> search(FormTemplateSearchRequest request, Pageable pageable) {
        Specification<FormTemplate> spec = specification.fromSearchRequest(request,authContext.getUsers().getId());
        return templateRepository.findAll(spec, pageable);
    }

    @Override
    public List<FormTemplate> list() {
        return templateRepository.findAllByUserId(authContext.getUsers().getId());
    }

    @Override
    public FormTemplate create(FormTemplateRequest request) {
        FormTemplate template = templateMapper.fromDTO(request);
        String urlCode = UrlUtils.generateUrlCode();
        template.setUrlCode(urlCode);
        template.setUserId(authContext.getUsers().getId());
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
    public void delete(List<Long> ids) {
        List<FormTemplate> templates = templateRepository.findAllById(ids);
        for (FormTemplate template : templates) {
            templateRepository.delete(template);
        }
    }

    @Override
    public FormTemplateDTO toDTO(FormTemplate template) {
        return templateMapper.toDTO(template);
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
        Optional<FormTemplate> template = templateRepository.findByIdAndUserId(id,authContext.getUsers().getId());

        if (template.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return template.get();
    }

    private FormTemplate findByUrlCodeorElseThrowNotFound(String urlCode) {
        Optional<FormTemplate> template = templateRepository.findByUrlCodeAndUserId(urlCode,authContext.getUsers().getId());

        if (template.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return template.get();
    }

}
