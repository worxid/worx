package id.worx.worx.web.model;

import java.io.Serializable;
import java.time.Instant;

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
public class FormSubmissionSearchRequest implements Serializable {

    private static final long serialVersionUID = 1068729504805818697L;

    private Long templateId;

    private String label;
    private String description;

    @JsonProperty("created_on")
    private Instant createdOn;
    @JsonProperty("modified_on")
    private Instant modifiedOn;
    @JsonProperty("submit_date")
    private Instant submitDate;

    @JsonProperty("submit_address")
    private String submitAddress;

    @JsonProperty("respondent_label")
    private String respondentLabel;

}
