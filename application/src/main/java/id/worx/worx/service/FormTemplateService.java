package id.worx.worx.service;

import java.util.List;
import java.util.Map;

import id.worx.worx.data.request.FormTemplateCreationDTO;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;

public interface FormTemplateService {

    List<Field> getSampleFieldList();

    Map<String, Value> getSampleValueMap();

    FormTemplate create(FormTemplateCreationDTO formTemplateDTO);

}
