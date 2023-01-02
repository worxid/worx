package id.worx.worx.web.controller;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.ContextConfiguration;

import com.fasterxml.jackson.core.type.TypeReference;

import id.worx.worx.common.ModelConstants;
import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BasePageResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.web.model.request.GroupSearchRequest;

@ContextConfiguration(classes = { GroupControllerTest.Config.class })
class GroupControllerTest extends AbstractControllerTest {

    static class Config {
    }

    @Test
    void testMainGroupCreation() throws Exception {
        BaseListResponse<GroupDTO> response = doGetTyped("/groups", new TypeReference<BaseListResponse<GroupDTO>>() {
        });
        List<GroupDTO> list = response.getList();
        boolean isMainGroupExists = list.stream().anyMatch(group -> group.getIsDefault().booleanValue());
        assertTrue(isMainGroupExists);
    }

    @Test
    void testSaveGroup() throws Exception {
        String name = "Field 2 Group";
        String color = "#4287f5";
        List<Long> deviceId = new ArrayList<>(Arrays.asList(1L, 2L, 3L));
        List<Long> formId = new ArrayList<>(Arrays.asList(1L, 2L, 3L));
        GroupRequest request = new GroupRequest(name, color,deviceId,formId);
        BaseValueResponse<GroupDTO> actualResponse = doPostWithTypedResponse(
                "/groups",
                request,
                new TypeReference<BaseValueResponse<GroupDTO>>() {
                },
                status().isCreated());
        assertEquals(name, actualResponse.getValue().getName());
        assertEquals(color, actualResponse.getValue().getColor());
    }

    @Test
    void testUpdateGroup() throws Exception {
        String name = "Field 3 Group";
        String color = "#4387f5";
        List<Long> deviceId = new ArrayList<>(Arrays.asList(1L, 2L, 3L));
        List<Long> formId = new ArrayList<>(Arrays.asList(1L, 2L, 3L));
        GroupRequest request = new GroupRequest(name, color,deviceId,formId);
        BaseValueResponse<GroupDTO> response = doPostWithTypedResponse(
                "/groups",
                request,
                new TypeReference<BaseValueResponse<GroupDTO>>() {
                },
                status().isCreated());
        GroupDTO dto = response.getValue();
        assertEquals(name, dto.getName());
        assertEquals(color, dto.getColor());

        Long groupId = dto.getId();
        String updatedName = "Updated Field 3 Group";
        String updatedColor = "#4387f6";
        List<Long> upadateDeviceId = new ArrayList<>(Arrays.asList(4L, 5L, 6L));
        List<Long> updateFormId = new ArrayList<>(Arrays.asList(4L, 5L, 6L));
        GroupRequest updateRequest = new GroupRequest(updatedName, updatedColor,upadateDeviceId,updateFormId);
        BaseValueResponse<GroupDTO> actualResponse = doPutWithTypedResponse(
                "/groups/" + groupId,
                updateRequest,
                new TypeReference<BaseValueResponse<GroupDTO>>() {
                });

        assertEquals(updatedName, actualResponse.getValue().getName());
        assertEquals(updatedColor, actualResponse.getValue().getColor());
    }

    @Test
    void testDeleteGroup() throws Exception {
        String name = "Field 4 Group";
        String color = "#4487f5";
        List<Long> deviceId = new ArrayList<>(Arrays.asList(1L, 2L, 3L));
        List<Long> formId = new ArrayList<>(Arrays.asList(1L, 2L, 3L));
        GroupRequest request = new GroupRequest(name, color,deviceId,formId);
        BaseValueResponse<GroupDTO> response = doPostWithTypedResponse(
                "/groups",
                request,
                new TypeReference<BaseValueResponse<GroupDTO>>() {
                },
                status().isCreated());
        GroupDTO dto = response.getValue();
        assertEquals(name, dto.getName());
        assertEquals(color, dto.getColor());

        Long groupId = dto.getId();
        doDelete("/groups/" + groupId)
                .andExpect(status().isNoContent());

        doGet("/groups/" + groupId)
                .andExpect(status().isNotFound())
                .andExpect(statusReason(containsString(WorxErrorCode.ENTITY_NOT_FOUND_ERROR.getReasonPhrase())));
    }

    @Test
    void testSearchGroup() throws Exception {
        String name = ModelConstants.GROUP_DEFAULT_NAME;
        String color = ModelConstants.GROUP_DEFAULT_COLOR;
        GroupSearchRequest request = new GroupSearchRequest();
        request.setName(name);
        request.setColor(color);

        BasePageResponse<GroupDTO> response = doPostWithTypedResponse(
            "/groups/search",
            request,
            new TypeReference<BasePageResponse<GroupDTO>>() {
        });

        List<GroupDTO> list = response.getContent();
        boolean isMainGroupExists = list.stream().anyMatch(group -> group.getIsDefault().booleanValue());
        assertTrue(isMainGroupExists);
    }

}
