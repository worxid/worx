package id.worx.worx.service;

import java.util.List;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.data.request.FormTemplateRequest;
import id.worx.worx.entity.FormTemplate;

public interface FormTemplateService {

    List<FormTemplate> list();

    FormTemplate create(FormTemplateRequest request);

    FormTemplate read(Long id);

    FormTemplate update(Long id, FormTemplateRequest request);

    void delete(Long id);

    FormTemplateDTO toDTO(FormTemplate template);

    FormTemplate assignGroup(Long id, List<Long> groupIds);

}
