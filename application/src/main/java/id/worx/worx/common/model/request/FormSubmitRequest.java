package id.worx.worx.common.model.request;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.dto.LocationDTO;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FormSubmitRequest implements Serializable {

    private static final long serialVersionUID = -3556171749946635051L;

    @Schema(example = "Submit Label")
    private String label;
    @Schema(example = "Submit Description")
    private String description;

    @JsonProperty("template_id")
    private Long templateId;

    private List<Field> fields;
    private Map<String, Value> values;

    @JsonProperty("submit_in_zone")
    private Boolean submitInZone;

    @Schema()
    @JsonProperty("submit_location")
    private LocationDTO submitLocation;

}
