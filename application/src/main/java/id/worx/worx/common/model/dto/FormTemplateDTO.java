package id.worx.worx.common.model.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.forms.field.Field;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class FormTemplateDTO implements Serializable {

    private static final long serialVersionUID = -1081254233609145812L;

    private Long id;
    private String label;
    private String description;
    private List<Field> fields;

    @JsonProperty("created_on")
    private String createdOn;
    @JsonProperty("modified_on")
    private String modifiedOn;

    @JsonProperty("assigned_groups")
    private Set<GroupDTO> assignedGroups;
    @JsonProperty("submission_count")
    private Integer submissionCount;

    @JsonProperty("submit_in_zone")
    private Boolean submitInZone;
    @JsonProperty("default")
    private Boolean isDefaultForm;

    @JsonProperty("fields_size")
    public Integer getFieldsSize() {
        return this.fields.size();
    }

}
