package id.worx.worx.web.model.request;

import java.io.Serializable;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.dto.FormSource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class FormSearchRequest implements Serializable {

    private static final long serialVersionUID = 1068729504805818697L;

    @JsonProperty("template_id")
    private Long templateId;

    private String label;
    private String description;

    private Instant from;
    private Instant to;

    @JsonProperty("submit_address")
    private String submitAddress;

    @JsonProperty("global_search")
    private String globalSearch;

    private FormSource source;

}