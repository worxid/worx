package id.worx.worx.common.model.request;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotBlank;

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
public class GroupRequest implements Serializable {

    private static final long serialVersionUID = 6172123880029773313L;

    @NotBlank
    private String name;
    @NotBlank
    private String color;
    @JsonProperty("form_ids")
    private List<Long> formIds;
    @JsonProperty("device_ids")
    private List<Long> deviceIds;

}
