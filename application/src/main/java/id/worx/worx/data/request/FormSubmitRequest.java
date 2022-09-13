package id.worx.worx.data.request;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.data.dto.LocationDTO;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FormSubmitRequest implements Serializable {

    private static final long serialVersionUID = -3556171749946635051L;

    private Long id;
    private String label;
    private String description;

    @JsonProperty("template_id")
    private Long templateId;

    private List<Field> fields;
    private Map<String, Value> values;

    @JsonProperty("submit_in_zone")
    private Boolean submitInZone;

    @JsonProperty("submit_location")
    private LocationDTO submitLocation;

}
