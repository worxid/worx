package id.worx.worx.mapper;

import java.util.List;
import java.util.Map;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.entity.Form;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;
import id.worx.worx.mobile.model.MobileFormDTO;

@Mapper(componentModel = "spring")
public abstract class FormMapper {

    @Autowired
    protected ObjectMapper objectMapper;

    @Mapping(source = "fields", target = "fields", qualifiedByName = "readFieldfromString")
    @Mapping(source = "values", target = "values", qualifiedByName = "readValuefromString")
    @Mapping(source = "submitLat", target = "submitLocation.lat")
    @Mapping(source = "submitLng", target = "submitLocation.lng")
    @Mapping(source = "submitLng", target = "submitLocation.address")
    public abstract FormDTO toDTO(Form form);

    @Mapping(source = "fields", target = "fields", qualifiedByName = "readFieldfromString")
    @Mapping(source = "values", target = "values", qualifiedByName = "readValuefromString")
    @Mapping(source = "submitLat", target = "submitLocation.lat")
    @Mapping(source = "submitLng", target = "submitLocation.lng")
    @Mapping(source = "submitLng", target = "submitLocation.address")
    public abstract MobileFormDTO toMobileDTO(Form form);

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

}
