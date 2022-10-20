package id.worx.worx.common.model.request;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.forms.field.Field;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class FormTemplateRequest implements Serializable {

    private static final long serialVersionUID = -1193760589891233285L;

    @NotBlank
    private String label;
    private String description;
    private List<Field> fields;
    @JsonProperty("submit_in_zone")
    private Boolean submitInZone;
    @JsonProperty("default")
    private Boolean isDefaultForm;

}
