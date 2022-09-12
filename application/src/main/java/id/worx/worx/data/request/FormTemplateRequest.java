package id.worx.worx.data.request;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.service.field.Field;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FormTemplateRequest implements Serializable {

    private static final long serialVersionUID = -1193760589891233285L;

    @NotBlank
    private String label;
    private String description;
    @NotEmpty
    private List<Field> fields;
    @JsonProperty("submit_in_zone")
    private Boolean submitInZone;
    @JsonProperty("default")
    private Boolean isDefaultForm;

}
