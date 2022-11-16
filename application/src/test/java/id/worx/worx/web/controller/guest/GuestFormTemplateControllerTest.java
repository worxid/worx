package id.worx.worx.web.controller.guest;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.config.security.WorxUserDetailsService;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.mobile.model.MobileFormTemplateDTO;
import id.worx.worx.service.FormService;
import id.worx.worx.service.FormTemplateService;

class GuestFormTemplateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    WorxUserDetailsService WorxUserDetailsService;

    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    FormMapper formMapper;
    @Autowired
    FormTemplateMapper templateMapper;

    @Autowired
    FormService formService;
    @Autowired
    FormTemplateService templateService;

    void givenCode_whenRead_thenReturn() throws JsonProcessingException, Exception {
        String deviceCode = "b97ab7803a27991f";
        FormTemplate expectedTemplate1 = FormTemplate.builder()
                .id(1L)
                .build();
        FormTemplate expectedTemplate2 = FormTemplate.builder()
                .id(2L)
                .build();
        List<FormTemplate> expectedTemplateList = List.of(expectedTemplate1, expectedTemplate2);
        List<MobileFormTemplateDTO> expectedList = expectedTemplateList.stream()
                .map(templateMapper::toMobileDTO)
                .collect(Collectors.toList());
        BaseListResponse<MobileFormTemplateDTO> expectedResponse = BaseListResponse.<MobileFormTemplateDTO>builder()
                .list(expectedList)
                .build();

        when(templateService.list(deviceCode)).thenReturn(expectedTemplateList);

        this.mockMvc.perform(
                get("mobile/forms")
                        .header("deviceCode", deviceCode)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }
}
