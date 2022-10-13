package id.worx.worx.service;

import java.util.List;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.entity.Group;
import id.worx.worx.web.model.request.GroupSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GroupService {

    List<Group> list();

    Group create(GroupRequest request);

    Group read(Long id);

    Group update(Long id, GroupRequest request);

    void delete(Long id);

    GroupDTO toDTO(Group group);

    Page<Group> searchGroup(GroupSearchRequest groupSearchRequest, Pageable pageable);

}
