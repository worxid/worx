package id.worx.worx.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import id.worx.worx.entity.users.Users;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.FormTemplateRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import id.worx.worx.entity.Group;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.DeviceMapper;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.mapper.GroupMapper;
import id.worx.worx.repository.GroupRepository;

@ExtendWith(MockitoExtension.class)
class GroupServiceImplTest {

    @Mock
    GroupRepository groupRepository;
    @Mock
    FormTemplateRepository formTemplateRepository;
    @Mock
    DeviceRepository deviceRepository;

    @Mock
    GroupMapper groupMapper;
    @Mock
    FormTemplateMapper templateMapper;
    @Mock
    DeviceMapper deviceMapper;

    private GroupService groupService;

    @Mock
    AuthenticationContext authContext;

    @BeforeEach
    void init() {

        groupService = new GroupServiceImpl(
                groupRepository,
                formTemplateRepository,
                deviceRepository,
                groupMapper,
                templateMapper,
                deviceMapper,
                authContext);
    }

    @Test
    void givenUserId_whenCreateDefaultGroup_thenReturn() {
        Long userId = 1L;

        when(groupRepository.save(any(Group.class))).thenAnswer(invoc -> invoc.getArguments()[0]);

        Group group = groupService.createDefaultGroup(userId);

        verify(groupRepository, times(1)).save(group);
    }

    @Test
    void givenGroupId_whenDelete_thenReturn() {
        Long groupId = 1L;
        Long userId = 1L;
        Group group = Group.builder()
                .id(1L)
                .build();
        Users users = Users.builder()
                .id(1L)
                .build();

        when(groupRepository.findByIdAndUserId(groupId, userId)).thenReturn(Optional.of(group));
        when(authContext.getUsers()).thenReturn(users);
        groupService.delete(groupId);

        verify(groupRepository, times(1)).delete(group);
    }

    @Test
    void givenNonExistentGroupId_whenDelete_thenThrowWorxException() {
        Long nonExistentGroupId = 1L;
        Users users = Users.builder()
                .id(1L)
                .build();

        lenient().when(groupRepository.findById(nonExistentGroupId)).thenReturn(Optional.empty());
        when(authContext.getUsers()).thenReturn(users);

        Assertions.assertThrows(WorxException.class, () -> groupService.delete(nonExistentGroupId));
    }

    @Test
    void givenMultipleGroupIds_whenDelete_thenReturn() {
        List<Long> groupIds = List.of(1L, 2L);
        Long userId = 1L;
        Group group1 = Group.builder()
                .id(1L)
                .build();

        Group group2 = Group.builder()
                .id(2L)
                .build();
        Users users = Users.builder()
                .id(1L)
                .build();

        when(groupRepository.findByIdsAndUserId(groupIds, userId))
                .thenReturn(List.of(group1, group2));
        when(authContext.getUsers()).thenReturn(users);

        groupService.delete(groupIds);

        verify(groupRepository, times(1)).delete(group1);
        verify(groupRepository, times(1)).delete(group2);
    }

    @Test
    void givenDefaultGroupId_whenDelete_thenReturn() {
        Long defaultGroupId = 1L;
        List<Long> groupIds = List.of(defaultGroupId);
        Long userId = 1L;
        Group group1 = Group.builder()
                .id(1L)
                .isDefault(true)
                .build();
        Users users = Users.builder()
                .id(1L)
                .build();

        when(groupRepository.findByIdsAndUserId(groupIds, userId)).thenReturn(List.of(group1));
        when(authContext.getUsers()).thenReturn(users);

        Assertions.assertThrows(WorxException.class, () -> groupService.delete(defaultGroupId));
        Assertions.assertThrows(WorxException.class, () -> groupService.delete(groupIds));
    }
}
