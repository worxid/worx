package id.worx.worx.data.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.service.field.Field;
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
public class FormTemplateDTO implements Serializable {

    private static final long serialVersionUID = -1081254233609145812L;

    private Long id;
    private String label;
    private String description;
    private List<Field> fields;
    @JsonProperty("submit_in_zone")
    private Boolean submitInZone;
    @JsonProperty("default")
    private Boolean isDefaultForm;

}
