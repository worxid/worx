package id.worx.worx.service.specification;

import id.worx.worx.entity.Group;
import id.worx.worx.entity.Group_;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.entity.devices.Device_;
import id.worx.worx.web.model.request.DeviceSearchRequest;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Component
public class DeviceSpecification implements BaseSpecification<Device>{

    public Specification<Device> fromSearchRequest(DeviceSearchRequest searchRequest){
        Specification<Device> spec= Specification.where(null);

        if (Objects.nonNull(searchRequest.getLabel())){
            spec= spec.and(like(Device_.LABEL,searchRequest.getLabel()));
        }
        if (Objects.nonNull(searchRequest.getDeviceCode())){
            spec= spec.and(like(Device_.DEVICE_CODE,searchRequest.getDeviceCode()));
        }
        if (Objects.nonNull(searchRequest.getDeviceModel())){
            spec= spec.and(like(Device_.DEVICE_MODEL,searchRequest.getDeviceModel()));
        }
        if (Objects.nonNull(searchRequest.getDeviceLanguage())){
            spec= spec.and(like(Device_.DEVICE_LANGUAGE,searchRequest.getDeviceLanguage()));
        }
        if (Objects.nonNull(searchRequest.getDeviceOsVersion())){
            spec= spec.and(like(Device_.DEVICE_OS_VERSION,searchRequest.getDeviceOsVersion()));
        }
        if (Objects.nonNull(searchRequest.getDeviceAppVersion())){
            spec= spec.and(like(Device_.DEVICE_APP_VERSION,searchRequest.getDeviceAppVersion()));
        }
        if (Objects.nonNull(searchRequest.getGroups())){
            List<String> groupNames= searchRequest.getGroups();
            Specification<Device> deviceGroupSpec= Specification.where(null);

            for (String groupName: groupNames){
                deviceGroupSpec= deviceGroupSpec.and(isAssignedToDeviceGroups(groupName));
            }
            spec= spec.and(deviceGroupSpec);
        }
        if(Objects.nonNull(searchRequest.getJoinedTime())){
            spec= spec.and(lessThanOrEqualTo(Device_.JOINED_DATE,searchRequest.getJoinedTime()));
        }
        if (Objects.nonNull(searchRequest.getGlobalSearch())){
            spec= spec.and(globalSearch(searchRequest.getGlobalSearch()));
        }


        return spec;
    }

    public Specification<Device> globalSearch(String globalSearch){
        Specification<Device> spec= Specification.where(null);

        return spec.or(like(Device_.LABEL,globalSearch))
                .or(like(Device_.DEVICE_CODE,globalSearch))
                .or(like(Device_.DEVICE_MODEL,globalSearch))
                .or(like(Device_.DEVICE_LANGUAGE,globalSearch))
                .or(like(Device_.DEVICE_OS_VERSION,globalSearch))
                .or(like(Device_.DEVICE_APP_VERSION,globalSearch))
                .or(isAssignedToDeviceGroups(globalSearch));
    }

    public Specification<Device> isAssignedToDeviceGroups(String groupName){
        return (root, query, criteriaBuilder) -> {
            Root<Device> devices= root;
            Subquery<Group> subquery= query.subquery(Group.class);
            Root<Group> group= subquery.from(Group.class);
            Expression<Set<Device>> deviceGroups= devices.get(Device_.ASSIGNED_GROUPS);

            subquery.select(group)
                .where(
                    criteriaBuilder.like(group.get(Group_.NAME), groupName),
                    criteriaBuilder.isMember(devices, deviceGroups));
            return criteriaBuilder.exists(subquery);
        };
    }
}
