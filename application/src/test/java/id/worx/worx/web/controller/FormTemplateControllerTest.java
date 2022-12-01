package id.worx.worx.web.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.ContextConfiguration;

import com.fasterxml.jackson.core.type.TypeReference;

import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.forms.field.CheckboxGroupField;
import id.worx.worx.common.model.forms.field.DropdownField;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.field.Option;
import id.worx.worx.common.model.forms.field.TextField;
import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.common.model.response.BaseValueResponse;

@ContextConfiguration(classes = { FormTemplateControllerTest.Config.class })
public class FormTemplateControllerTest extends AbstractControllerTest {

    static class Config {
    }

    @Test
    void givenFormTemplateRequest_whenCreate_thenReturn() throws Exception {
        String label = "Monthly Form #1";
        String description = "Monthly Form Number 1";
        List<Field> fields = new ArrayList<>();
        fields.add(new TextField("text-field-id", "Text Field 1", false, "description", 1, 1024));
        Boolean submitInZone = false;
        Boolean isDefaultForm = false;
        FormTemplateRequest request = new FormTemplateRequest(label, description, fields, submitInZone, isDefaultForm);
        BaseValueResponse<FormTemplateDTO> actualResponse = doPostWithTypedResponse(
                "/form/template",
                request,
                new TypeReference<BaseValueResponse<FormTemplateDTO>>() {
                },
                status().isCreated());
        FormTemplateDTO actualFormTemplate = actualResponse.getValue();
        assertEquals(label, actualFormTemplate.getLabel());
        assertEquals(description, actualFormTemplate.getDescription());
        assertEquals(fields.size(), actualFormTemplate.getFields().size());
        assertEquals(submitInZone, actualFormTemplate.getSubmitInZone());
        assertEquals(isDefaultForm, actualFormTemplate.getIsDefaultForm());
        assertEquals(1, actualFormTemplate.getAssignedGroups().size());
    }

    @Test
    void givenFormTemplateRequest_whenUpdate_thenReturn() throws Exception {
        String label = "Monthly Form #2";
        String description = "Monthly Form Number 2";
        List<Field> fields = new ArrayList<>();
        fields.add(new TextField("text-field-id", "Text Field 1", false, "description", 1, 1024));
        Boolean submitInZone = false;
        Boolean isDefaultForm = false;
        FormTemplateRequest request = new FormTemplateRequest(label, description, fields, submitInZone, isDefaultForm);
        BaseValueResponse<FormTemplateDTO> response = doPostWithTypedResponse(
                "/form/template",
                request,
                new TypeReference<BaseValueResponse<FormTemplateDTO>>() {
                },
                status().isCreated());
        FormTemplateDTO template = response.getValue();
        assertEquals(label, template.getLabel());
        assertEquals(description, template.getDescription());
        assertEquals(fields.size(), template.getFields().size());

        Long templateId = template.getId();
        String updatedLabel = "Updated Monthly Form #2";
        String updatedDescription = "Updated Monthly Form Number 2";
        List<Field> updatedFields = new ArrayList<>();
        updatedFields.add(new CheckboxGroupField(
                "checkbox-field-id", "Checkbox Field 1", "description", true, 1, 2,
                List.of(new Option("Option 1"), new Option("Option 2"))));
        updatedFields.add(new DropdownField(
                "dropdown-field-id", "Dropdown Field 1", "description", true,
                List.of(new Option("Option 1"), new Option("Option 2"))));
        FormTemplateRequest updateRequest = new FormTemplateRequest(updatedLabel, updatedDescription, updatedFields,
                template.getSubmitInZone(), template.getIsDefaultForm());
        BaseValueResponse<FormTemplateDTO> actualResponse = doPutWithTypedResponse(
                "/form/template/" + templateId,
                updateRequest,
                new TypeReference<BaseValueResponse<FormTemplateDTO>>() {
                });
        FormTemplateDTO actualTemplate = actualResponse.getValue();
        assertEquals(updatedLabel, actualTemplate.getLabel());
        assertEquals(updatedDescription, actualTemplate.getDescription());
        assertEquals(updatedFields.size(), actualTemplate.getFields().size());

    }

}
