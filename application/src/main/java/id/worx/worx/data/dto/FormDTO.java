package id.worx.worx.data.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FormDTO implements Serializable {

    private static final long serialVersionUID = -3930933140756873248L;

    private Long id;
    @JsonProperty("template_id")
    private Long templateId;
    private String label;
    private String description;
    private List<Field> fields;
    private Map<String, Value> values;
    @JsonProperty("submit_in_zone")
    private Boolean submitInZone;
    @JsonProperty("submit_location")
    private LocationDTO submitLocation;

}