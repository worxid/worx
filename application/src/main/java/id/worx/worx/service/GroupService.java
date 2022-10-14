package id.worx.worx.service;

import java.util.List;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.entity.Group;

public interface GroupService {

    List<Group> list();

    Group create(GroupRequest request);

    Group read(Long id);

    Group update(Long id, GroupRequest request);

    void delete(Long id);

    void delete(List<Long> ids);

    GroupDTO toDTO(Group group);

}
