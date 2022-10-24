package id.worx.worx.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import id.worx.worx.web.model.request.GroupSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.Group;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.GroupMapper;
import id.worx.worx.repository.GroupRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

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
        List<Group> groups = groupRepository.findByIdsAndUserId(ids,authContext.getUsers().getId());
        for (Group group : groups) {
            this.delete(group);
        }
    }

    @Override
    public GroupDTO toDTO(Group group) {
        return groupMapper.toDTO(group);
    }

    @Override
    public Page<Group> searchGroup(GroupSearchRequest groupSearchRequest, Pageable pageable) {
        return groupRepository.search(groupSearchRequest.getId(),
            groupSearchRequest.getName(),
            groupSearchRequest.getColor(),
            authContext.getUsers().getId(),
            groupSearchRequest.getDeviceCount(),
            groupSearchRequest.getFormCount(),
            pageable);
    }

    private void delete(Group group) {
        Set<FormTemplate> templates = group.getTemplates();
        for (FormTemplate template : templates) {
            template.getAssignedGroups().remove(group);
        }
        groupRepository.delete(group);
    }

    private Group findByIdorElseThrowNotFound(Long id) {
        Optional<Group> group = groupRepository.findByIdAndUserId(id,authContext.getUsers().getId());

        if (group.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return group.get();
    }

}
