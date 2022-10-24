package id.worx.worx.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.web.model.request.FormTemplateSearchRequest;

public interface FormTemplateService {

    Page<FormTemplate> search(FormTemplateSearchRequest request, Pageable pageable);

    List<FormTemplate> list();

    List<FormTemplate> list(String deviceCode);

    FormTemplate create(FormTemplateRequest request);

    FormTemplate read(Long id);

    FormTemplate read(String code);

    FormTemplate update(Long id, FormTemplateRequest request);

    void delete(Long id);

    void delete(List<Long> ids);

    FormTemplateDTO toDTO(FormTemplate template);

    FormTemplate assignGroup(Long id, List<Long> groupIds);

    void share(FormTemplate template, List<String> recipients);

}
