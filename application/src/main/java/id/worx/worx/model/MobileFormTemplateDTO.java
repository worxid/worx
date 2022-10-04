package id.worx.worx.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import id.worx.worx.data.dto.FormTemplateDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@JsonIgnoreProperties({
        "assigned_groups",
        "submission_count"
})
@Setter
@Getter
@SuperBuilder
public class MobileFormTemplateDTO extends FormTemplateDTO {

    private static final long serialVersionUID = 7699503615167536641L;

}
