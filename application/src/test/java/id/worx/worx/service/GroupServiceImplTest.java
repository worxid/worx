package id.worx.worx.service;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import id.worx.worx.entity.Group;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.GroupMapper;
import id.worx.worx.repository.GroupRepository;

@ExtendWith(MockitoExtension.class)
class GroupServiceImplTest {

    @Mock
    GroupRepository groupRepository;

    @Mock
    GroupMapper groupMapper;

    private GroupService groupService;

    @BeforeEach
    void init() {
        groupService = new GroupServiceImpl(groupRepository, groupMapper);
    }

    @Test
    void givenGroupId_whenDelete_thenReturn() {
        Long groupId = 1L;
        Group group = Group.builder()
                .id(1L)
                .build();

        when(groupRepository.findById(groupId)).thenReturn(Optional.of(group));

        groupService.delete(groupId);

        verify(groupRepository, times(1)).delete(group);
    }

    @Test
    void givenNonExistentGroupId_whenDelete_thenThrowWorxException() {
        Long nonExistentGroupId = 1L;

        when(groupRepository.findById(nonExistentGroupId)).thenReturn(Optional.empty());

        Assertions.assertThrows(WorxException.class, () -> groupService.delete(nonExistentGroupId));
    }

    @Test
    void givenMultipleGroupIds_whenDelete_thenReturn() {
        List<Long> groupIds = List.of(1L, 2L);
        Group group1 = Group.builder()
                .id(1L)
                .build();

        Group group2 = Group.builder()
                .id(2L)
                .build();

        when(groupRepository.findAllById(groupIds)).thenReturn(List.of(group1, group2));

        groupService.delete(groupIds);

        verify(groupRepository, times(1)).delete(group1);
        verify(groupRepository, times(1)).delete(group2);
    }
}
