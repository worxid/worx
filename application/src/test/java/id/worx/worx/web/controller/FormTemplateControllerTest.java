package id.worx.worx.web.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.ContextConfiguration;

import com.fasterxml.jackson.core.type.TypeReference;

import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.field.TextField;
import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.common.model.response.BaseValueResponse;

@ContextConfiguration(classes = { FormTemplateControllerTest.Config.class })
public class FormTemplateControllerTest extends AbstractControllerTest {

    static class Config {
    }

    @Test
    void givenFormTemplateRequest_whenCreate_thenReturn() throws Exception {
        String label = "Field 2 Group";
        String description = "#4287f5";
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
        assertEquals(description, actualFormTemplate.getDescription());
        assertEquals(submitInZone, actualFormTemplate.getSubmitInZone());
        assertEquals(isDefaultForm, actualFormTemplate.getIsDefaultForm());
        assertEquals(1, actualFormTemplate.getAssignedGroups().size());
    }

    @Test
    void givenInvalidFormTemplateRequest_whenCreate_thenThrowException() throws Exception {
        String label = "Field 2 Group";
        String description = "#4287f5";
        List<Field> fields = new ArrayList<>();
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
        assertEquals(description, actualFormTemplate.getDescription());
        assertEquals(submitInZone, actualFormTemplate.getSubmitInZone());
        assertEquals(isDefaultForm, actualFormTemplate.getIsDefaultForm());
        assertEquals(1, actualFormTemplate.getAssignedGroups().size());
    }

}
