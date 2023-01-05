package id.worx.worx.web.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ContextConfiguration;
import com.fasterxml.jackson.core.type.TypeReference;
import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.dto.LocationDTO;
import id.worx.worx.common.model.dto.SearchFormDTO;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.field.TextField;
import id.worx.worx.common.model.forms.value.TextValue;
import id.worx.worx.common.model.forms.value.Value;
import id.worx.worx.common.model.request.FormSubmitRequest;
import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.common.model.response.BasePageResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.web.model.request.FormSearchRequest;

@ContextConfiguration(classes = {FormControllerTest.Config.class})
public class FormControllerTest extends AbstractControllerTest {

    static class Config {
    }

    @Test
    void givenFormSearchRequest_whenSearch_thenReturn() throws Exception {
        String label = "Monthly Form #1";
        String description = "Monthly Form Number 1";
        List<Field> fields = new ArrayList<>();
        fields.add(new TextField("text-field-id", "Text Field 1", false, "description"));
        Boolean submitInZone = false;
        Boolean isDefaultForm = false;
        FormTemplateRequest request =
                new FormTemplateRequest(label, description, fields, submitInZone, isDefaultForm);
        BaseValueResponse<FormTemplateDTO> response = doPostWithTypedResponse(
                "/form/template",
                request,
                new TypeReference<BaseValueResponse<FormTemplateDTO>>() {},
                status().isCreated());
        FormTemplateDTO formTemplate = response.getValue();
        Long templateId = formTemplate.getId();

        Map<String, Value> values = new HashMap<>();
        values.put("text-field-id", new TextValue("text input on text field 1"));
        LocationDTO location = null;

        FormSubmitRequest submitRequest = new FormSubmitRequest(
                label,
                description,
                templateId,
                fields,
                values,
                submitInZone,
                location);
        int submitCount = 2;
        doPostWithTypedResponse(
                "/form/submit",
                submitRequest,
                new TypeReference<BaseValueResponse<FormDTO>>() {},
                status().isCreated());
        doPostWithTypedResponse(
                "/form/submit",
                submitRequest,
                new TypeReference<BaseValueResponse<FormDTO>>() {},
                status().isCreated());

        FormSearchRequest searchRequest = FormSearchRequest.builder()
                .templateId(templateId)
                .build();
        BasePageResponse<SearchFormDTO> actualResponse = doPostWithTypedResponse(
                "/form/search",
                searchRequest,
                new TypeReference<BasePageResponse<SearchFormDTO>>() {});

        assertEquals(submitCount, actualResponse.getNumberOfElements());
    }

}
