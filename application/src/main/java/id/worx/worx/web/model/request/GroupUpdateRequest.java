package id.worx.worx.web.model.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GroupUpdateRequest implements Serializable {

    private static final long serialVersionUID = -6465388113918491543L;

    @NotBlank
    private String name;
    @NotBlank
    private String color;
    @JsonProperty("form_ids")
    private List<Long> formIds;
    @JsonProperty("device_ids")
    private List<Long> deviceIds;

}
