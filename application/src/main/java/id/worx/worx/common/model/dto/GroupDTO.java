package id.worx.worx.common.model.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class GroupDTO implements Serializable {

    private static final long serialVersionUID = 60071507013720586L;

    private Long id;
    private String name;
    private String color;
    @JsonProperty("is_default")
    private boolean isDefault;

    @JsonProperty("form_count")
    private Integer formCount;

    @JsonProperty("device_count")
    private Integer deviceCount;

}
