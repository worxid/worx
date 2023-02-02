package id.worx.worx.web.controller;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.ContextConfiguration;

import com.fasterxml.jackson.core.type.TypeReference;

import id.worx.worx.common.FormConstants;
import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.forms.field.CheckboxGroupField;
import id.worx.worx.common.model.forms.field.DateField;
import id.worx.worx.common.model.forms.field.DropdownField;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.field.FileField;
import id.worx.worx.common.model.forms.field.Option;
import id.worx.worx.common.model.forms.field.PhotoField;
import id.worx.worx.common.model.forms.field.RadioGroupField;
import id.worx.worx.common.model.forms.field.RatingField;
import id.worx.worx.common.model.forms.field.SignatureField;
import id.worx.worx.common.model.forms.field.TextField;
import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.common.model.request.MultipleDeleteRequest;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.exception.WorxErrorCode;

@ContextConfiguration(classes = { FormTemplateControllerTest.Config.class })
class FormTemplateControllerTest extends AbstractControllerTest {

    static class Config {
    }

    @Test
    void givenFormTemplateRequest_whenCreate_thenReturn() throws Exception {
        String label = "Monthly Form #1";
        String description = "Monthly Form Number 1";
        List<Field> fields = new ArrayList<>();
        fields.add(new TextField("text-field-id", "Text Field 1", false, "description", true));
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
        fields.add(new TextField("text-field-id", "Text Field 1", false, "description", null));
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

    @Test
    void givenId_whenDelete_thenReturn() throws Exception {
        String label = "Monthly Form #3";
        String description = "Monthly Form Number 3";
        List<Field> fields = new ArrayList<>();
        fields.add(new RadioGroupField("radiogroup-field-id", "Radio Group Field 1", "description", false,
                List.of(new Option("Option 1"), new Option("Option 2"))));
        fields.add(new DateField("date-field-id", "Date Field 1", "description", false, true, true));
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
        doDelete("/form/template/" + templateId)
                .andExpect(status().isNoContent());

        doGet("/form/template/" + templateId)
                .andExpect(status().isNotFound())
                .andExpect(statusReason(containsString(WorxErrorCode.ENTITY_NOT_FOUND_ERROR.getReasonPhrase())));
    }

    @Test
    void givenInvalidId_whenDelete_thenThrowWorxException() throws Exception {
        BaseListResponse<FormTemplateDTO> response = doGetTyped("/form/template",
                new TypeReference<BaseListResponse<FormTemplateDTO>>() {
                });
        List<FormTemplateDTO> list = response.getList();

        Long invalidId = 1L;
        if (!list.isEmpty()) {
            invalidId = list.stream().map(FormTemplateDTO::getId).max((o1, o2) -> Long.compare(o1, o2)).get() + 1L;
        }

        doDelete("/form/template/" + invalidId)
                .andExpect(status().isNotFound())
                .andExpect(statusReason(containsString(WorxErrorCode.ENTITY_NOT_FOUND_ERROR.getReasonPhrase())));
    }

    @Test
    void givenIds_whenDelete_thenReturn() throws Exception {
        String label = "Monthly Form #4";
        String description = "Monthly Form Number 4";
        List<Field> fields = new ArrayList<>();
        fields.add(new RatingField("rating-field-id", "Rating Field 1", "description", false, 10));
        fields.add(new FileField("file-field-id", "File Field 1", "description", false, 2, 20, 10, List.of()));
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
        Long firstTemplateId = template.getId();

        label = "Monthly Form #5";
        description = "Monthly Form Number 5";
        fields = new ArrayList<>();
        fields.add(new PhotoField("photo-field-id", "Photo Field 1", "description", false,
                FormConstants.PHOTO_FIELD_MAXIMUM_ALLOWED_MAX_FILES, true));
        fields.add(new SignatureField("signature-field-id", "Signature Field 1", "description", false));
        submitInZone = false;
        isDefaultForm = false;
        request = new FormTemplateRequest(label, description, fields, submitInZone, isDefaultForm);
        response = doPostWithTypedResponse(
                "/form/template",
                request,
                new TypeReference<BaseValueResponse<FormTemplateDTO>>() {
                },
                status().isCreated());
        template = response.getValue();
        Long secondTemplateId = template.getId();

        MultipleDeleteRequest deleteRequest = new MultipleDeleteRequest(List.of(firstTemplateId, secondTemplateId));
        doDelete("/form/template", deleteRequest)
                .andExpect(status().isNoContent());

    }

}
