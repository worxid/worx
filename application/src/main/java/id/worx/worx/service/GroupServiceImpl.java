package id.worx.worx.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import id.worx.worx.data.dto.GroupDTO;
import id.worx.worx.data.request.GroupRequest;
import id.worx.worx.entity.Group;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.GroupMapper;
import id.worx.worx.repository.FormTemplateGroupRepository;
import id.worx.worx.repository.GroupRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final FormTemplateGroupRepository templateGroupRepository;

    private final GroupMapper groupMapper;

    @Override
    public List<Group> list() {
        return groupRepository.findAll();
    }

    @Override
    public Group create(GroupRequest request) {
        Group group = groupMapper.fromRequest(request);
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
        groupRepository.delete(group);
    }

    @Override
    public GroupDTO toDTO(Group group) {
        return groupMapper.toDTO(group);
    }

    private Group findByIdorElseThrowNotFound(Long id) {
        Optional<Group> group = groupRepository.findById(id);

        if (group.isEmpty()) {
            throw new WorxException("Not Found", HttpStatus.NOT_FOUND.value());
        }

        return group.get();
    }

}
