package id.worx.worx.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.data.dto.FormTemplateSearchDTO;
import id.worx.worx.data.request.FormTemplateRequest;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.forms.service.field.Field;

@Mapper(componentModel = "spring", uses = { GroupMapper.class })
public abstract class FormTemplateMapper {

    @Autowired
    protected ObjectMapper objectMapper;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "createdOn", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedOn", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @Mapping(target = "assignedGroups", ignore = true)
    @Mapping(target = "urlCode", ignore = true)
    @Mapping(source = "fields", target = "fields", qualifiedByName = "toString")
    public abstract void update(@MappingTarget FormTemplate template, FormTemplateRequest request);

    @Mapping(source = "fields", target = "fields", qualifiedByName = "fromString")
    public abstract FormTemplateDTO toDto(FormTemplate template);

    @Mapping(source = "fields", target = "fields", qualifiedByName = "fromString")
    public abstract FormTemplateSearchDTO toSearchDTO(FormTemplate template);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "assignedGroups", ignore = true)
    @Mapping(target = "urlCode", ignore = true)
    @Mapping(source = "fields", target = "fields", qualifiedByName = "toString")
    public abstract FormTemplate fromDTO(FormTemplateRequest request);

    @Named("toString")
    public String toString(List<Field> fields) throws JsonProcessingException {
        return objectMapper.writeValueAsString(fields);
    }

    @Named("fromString")
    public List<Field> fromString(String fields) throws JsonProcessingException {
        return objectMapper.readValue(fields, new TypeReference<List<Field>>() {
        });
    }
}
