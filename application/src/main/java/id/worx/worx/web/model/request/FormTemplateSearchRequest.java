package id.worx.worx.web.model.request;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FormTemplateSearchRequest implements Serializable {

    private static final long serialVersionUID = -3108736407201256877L;

    private String label;
    private String description;

    @JsonProperty("created_on")
    private Instant createdOn;
    @JsonProperty("modified_on")
    private Instant modifiedOn;

    @JsonProperty("assigned_groups")
    private List<String> assignedGroups;
    @JsonProperty("submission_count")
    private Integer submissionCount;

}
