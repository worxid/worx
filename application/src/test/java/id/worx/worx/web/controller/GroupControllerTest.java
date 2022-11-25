package id.worx.worx.web.controller;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.ContextConfiguration;

import com.fasterxml.jackson.core.type.TypeReference;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.exception.WorxErrorCode;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
        GroupRequest request = new GroupRequest(name, color);
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
        GroupRequest request = new GroupRequest(name, color);
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
        GroupRequest updateRequest = new GroupRequest(updatedName, updatedColor);
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
        GroupRequest request = new GroupRequest(name, color);
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

}
