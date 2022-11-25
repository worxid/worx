package id.worx.worx.web.controller;

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

}
