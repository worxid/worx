package id.worx.worx.service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import id.worx.worx.data.dto.LinkFormDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.config.properties.WorxProperties;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.Group;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.service.specification.FormTemplateSpecification;
import id.worx.worx.util.UrlUtils;
import id.worx.worx.web.model.request.FormTemplateSearchRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FormTemplateServiceImpl implements FormTemplateService {

    private final WorxProperties worxProps;

    private final EmailService emailService;

    private final DeviceRepository deviceRepository;
    private final FormTemplateRepository templateRepository;
    private final GroupRepository groupRepository;
    private final UsersRepository usersRepository;

    private final FormTemplateMapper templateMapper;

    private final FormTemplateSpecification specification;

    private final AuthenticationContext authContext;

    @Override
    public Page<FormTemplate> search(FormTemplateSearchRequest request, Pageable pageable) {
        Specification<FormTemplate> spec = specification.fromSearchRequest(request, authContext.getUsers().getId());
        return templateRepository.findAll(spec, pageable);
    }

    @Override
    public List<FormTemplate> list() {
        return templateRepository.findAllByUserId(authContext.getUsers().getId());
    }

    @Override
    public List<FormTemplate> list(String deviceCode) {
        Optional<Device> optDevice = deviceRepository.findByDeviceCode(deviceCode);

        if (optDevice.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        Device device = optDevice.get();
        Set<FormTemplate> templates;
        Set<Group> groups = device.getAssignedGroups();

        if (groups.isEmpty()) {
            // TODO Replace this impl with user relation.
            String orgCode = device.getOrganizationCode();
            Optional<Users> optUser = usersRepository.findByOrganizationCode(orgCode);
            if (optUser.isEmpty()) {
                throw new WorxException(WorxErrorCode.DEVICE_NOT_REGISTERED);
            }
            Users user = optUser.get();
            Specification<FormTemplate> spec = specification.userIdEqualsTo(user.getId());
            spec = spec.and(specification.isNotAssignedToAnyGroup());
            templates = templateRepository.findAll(spec).stream()
                    .collect(Collectors.toSet());
        } else {
            templates = groups.stream()
                    .map(Group::getTemplates)
                    .flatMap(Collection::stream)
                    .collect(Collectors.toSet());
        }
        return templates.stream()
                .sorted((FormTemplate t1, FormTemplate t2) -> t1.getId().compareTo(t2.getId()))
                .collect(Collectors.toList());
    }

    @Override
    public FormTemplate create(FormTemplateRequest request) {
        Users user = authContext.getUsers();
        FormTemplate template = templateMapper.fromDTO(request);
        String urlCode = UrlUtils.generateUrlCode();
        template.setUrlCode(urlCode);
        template.setUserId(user.getId());

        Optional<Group> defaultUserGroupOptional = groupRepository.findByIsDefaultTrueAndUserId(user.getId());
        if (defaultUserGroupOptional.isPresent()) {
            Group defaultGroup = defaultUserGroupOptional.get();
            template.getAssignedGroups().add(defaultGroup);
            defaultGroup.getTemplates().add(template);
            groupRepository.save(defaultGroup);
        }

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
        String url = linkForm(code);
        Context context = new Context();
        context.setVariable("confirmationUrl", url);
        context.setVariable("formTitle", template.getLabel());
        context.setVariable("formDescription", template.getDescription());

        for (String recipient : recipients) {
            emailService.sendShareFormEmail(recipient, context);
        }

    }

    private FormTemplate findByIdorElseThrowNotFound(Long id) {
        Optional<FormTemplate> template = templateRepository.findByIdAndUserId(id, authContext.getUsers().getId());

        if (template.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return template.get();
    }

    private FormTemplate findByUrlCodeorElseThrowNotFound(String urlCode) {
        Optional<FormTemplate> template = templateRepository.findByUrlCode(urlCode);

        if (template.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return template.get();
    }

    @Override
    public LinkFormDTO generateLink(FormTemplate template) {

        String code = template.getUrlCode();
        String urlForm = linkForm(code);

        LinkFormDTO linkFormDTO = new LinkFormDTO();
        linkFormDTO.setLink(urlForm);

        return linkFormDTO;
    }

    public String linkForm(String urlCode) {
        return String.format(
                "%s/fill-form?code=%s",
                worxProps.getWeb().getEndpoint(),
                urlCode);
    }
}
