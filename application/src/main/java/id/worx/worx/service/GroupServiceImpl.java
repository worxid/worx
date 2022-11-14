package id.worx.worx.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.projection.GroupSearchProjection;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.Group;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.GroupMapper;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.util.JpaUtils;
import id.worx.worx.web.model.request.GroupSearchRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private static final String DEFAULT_GROUP_NAME_STRING = "Main Group";
    private static final String DEFAULT_GROUP_COLOR_STRING = "#DA3630";

    private final GroupRepository groupRepository;

    private final GroupMapper groupMapper;

    private final AuthenticationContext authContext;

    @Override
    public List<Group> list() {
        return groupRepository.findAllByUserId(authContext.getUsers().getId());
    }

    @Override
    public Group create(GroupRequest request) {
        Group group = groupMapper.fromRequest(request);
        group.setUserId(authContext.getUsers().getId());
        group = groupRepository.save(group);
        return group;
    }

    @Override
    public Group createDefaultGroup(Long userId) {
        Group group = Group.builder()
                .name(DEFAULT_GROUP_NAME_STRING)
                .color(DEFAULT_GROUP_COLOR_STRING)
                .userId(userId)
                .isDefault(true)
                .build();
        group = groupRepository.save(group);
        return group;
    }

    @Override
    public Group read(Long id) {
        return this.findByIdorElseThrowNotFound(id);
    }

    @Override
    public Group update(Long id, GroupRequest request) {
        Group group = this.findByIdorElseThrowNotFound(id);
        groupMapper.update(group, request);
        group = groupRepository.save(group);
        return group;
    }

    @Override
    public void delete(Long id) {
        Group group = this.findByIdorElseThrowNotFound(id);
        this.delete(group);
    }

    @Override
    public void delete(List<Long> ids) {
        List<Group> groups = groupRepository.findByIdsAndUserId(ids, authContext.getUsers().getId());
        for (Group group : groups) {
            this.delete(group);
        }
    }

    @Override
    public GroupDTO toDTO(Group group) {
        return groupMapper.toDTO(group);
    }

    @Override
    public GroupDTO toDTO(GroupSearchProjection groupSearchProjection) {
        return groupMapper.toDTO(groupSearchProjection);
    }

    @Override
    public Page<GroupSearchProjection> searchGroup(GroupSearchRequest groupSearchRequest, Pageable pageable) {
        Pageable customPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), JpaUtils.replaceSort(pageable.getSort()));
        return groupRepository.search(groupSearchRequest.getId(),
                groupSearchRequest.getName(),
                groupSearchRequest.getColor(),
                authContext.getUsers().getId(),
                groupSearchRequest.getDeviceCount(),
                groupSearchRequest.getFormCount(),
                customPageable);
    }

    private void delete(Group group) {
        Set<FormTemplate> templates = group.getTemplates();
        for (FormTemplate template : templates) {
            template.getAssignedGroups().remove(group);
        }
        groupRepository.delete(group);
    }

    private Group findByIdorElseThrowNotFound(Long id) {
        Optional<Group> group = groupRepository.findByIdAndUserId(id, authContext.getUsers().getId());

        if (group.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return group.get();
    }

}
