package id.worx.worx.service;

import id.worx.worx.model.request.FieldCondition;
import id.worx.worx.model.response.pageable.PagingResponseModel;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BaseService <EN, IN, OU, ID>{

    Optional<OU> findById(ID id);

    OU getById(ID entityId);

    List<OU> getAll();

    OU save(IN request);

    OU update(ID entityId, IN entity);

    void delete(ID entityId);

    PagingResponseModel<OU> search(List<FieldCondition> conditions, Pageable pageable);

    void softDelete (ID id);

}
