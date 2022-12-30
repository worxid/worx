package id.worx.worx.service;

import java.util.List;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.projection.GroupSearchProjection;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.entity.Group;
import id.worx.worx.web.model.request.GroupSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GroupService {

    List<Group> list();

    Group create(GroupRequest request);

    Group createDefaultGroup(Long userId);

    Group read(Long id);

    Group update(Long id, GroupRequest request);

    void delete(Long id);

    void delete(List<Long> ids);

    GroupDTO toDTO(Group group);

    GroupDTO toDTO(GroupSearchProjection groupSearchProjection);

    Page<GroupSearchProjection> searchGroup(GroupSearchRequest groupSearchRequest, Pageable pageable);

    Group updateGroup(Long id, List<Long> formId,List<Long> deviceId);
}
