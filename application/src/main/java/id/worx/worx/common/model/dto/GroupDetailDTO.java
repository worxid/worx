package id.worx.worx.common.model.dto;

import java.io.Serializable;
import java.util.List;
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
public class GroupDetailDTO implements Serializable {

    private static final long serialVersionUID = -3683819766226565519L;

    private Long id;
    private String name;
    private String color;
    @JsonProperty("is_default")
    private Boolean isDefault;

    @JsonProperty("form_count")
    private Integer formCount;

    @JsonProperty("device_count")
    private Integer deviceCount;

    private List<SimpleFormTemplateDTO> forms;

    private List<SimpleDeviceDTO> devices;

}
