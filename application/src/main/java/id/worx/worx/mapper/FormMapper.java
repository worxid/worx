package id.worx.worx.mapper;

import java.util.List;
import java.util.Map;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.value.Value;
import id.worx.worx.common.model.request.FormSubmitRequest;
import id.worx.worx.entity.Form;
import id.worx.worx.mobile.model.MobileFormDTO;

@Mapper(componentModel = "spring")
public abstract class FormMapper {

    @Autowired
    protected ObjectMapper objectMapper;

    @Mapping(source = "template.id", target = "templateId")
    @Mapping(source = "fields", target = "fields", qualifiedByName = "readFieldfromString")
    @Mapping(source = "values", target = "values", qualifiedByName = "readValuefromString")
    @Mapping(source = "submitLat", target = "submitLocation.lat")
    @Mapping(source = "submitLng", target = "submitLocation.lng")
    @Mapping(source = "submitAddress", target = "submitLocation.address")
    public abstract FormDTO toDTO(Form form);

    @Mapping(source = "template.id", target = "templateId")
    @Mapping(source = "fields", target = "fields", qualifiedByName = "readFieldfromString")
    @Mapping(source = "values", target = "values", qualifiedByName = "readValuefromString")
    @Mapping(source = "submitLat", target = "submitLocation.lat")
    @Mapping(source = "submitLng", target = "submitLocation.lng")
    @Mapping(source = "submitLng", target = "submitLocation.address")
    public abstract MobileFormDTO toMobileDTO(Form form);

    @Mapping(source = "submitLocation.lat", target = "submitLat", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "submitLocation.lng", target = "submitLng", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "submitLocation.address", target = "submitAddress", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "fields", target = "fields", qualifiedByName = "writeFieldAsString")
    @Mapping(source = "values", target = "values", qualifiedByName = "writeValueAsString")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "template", ignore = true)
    @Mapping(target = "respondentType", ignore = true)
    @Mapping(target = "respondentLabel", ignore = true)
    @Mapping(target = "respondentDeviceCode", ignore = true)
    @Mapping(target = "respondentIP", ignore = true)
    @Mapping(target = "submitDate", ignore = true)
    public abstract Form fromSubmitRequest(FormSubmitRequest request);

    @Named("readFieldfromString")
    public List<Field> readFieldfromString(String fields) throws JsonProcessingException {
        return objectMapper.readValue(fields, new TypeReference<List<Field>>() {
        });
    }

    @Named("readValuefromString")
    public Map<String, Value> readValuefromString(String fields) throws JsonProcessingException {
        return objectMapper.readValue(fields, new TypeReference<Map<String, Value>>() {
        });
    }

    @Named("writeFieldAsString")
    public String writeFieldAsString(List<Field> fields) throws JsonProcessingException {
        return objectMapper.writeValueAsString(fields);
    }

    @Named("writeValueAsString")
    public String writeValueAsString(Map<String, Value> values) throws JsonProcessingException {
        return objectMapper.writeValueAsString(values);
    }

}
