package id.worx.worx.service;

import java.util.List;

import id.worx.worx.data.dto.GroupDTO;
import id.worx.worx.entity.Group;

public interface GroupService {

    List<Group> list();

    Group create();

    Group read(Long id);

    Group update(Long id);

    void delete(Long id);

    GroupDTO toDTO(Group group);

}
