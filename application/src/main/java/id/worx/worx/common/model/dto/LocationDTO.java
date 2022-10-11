package id.worx.worx.common.model.dto;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationDTO implements Serializable {

    private static final long serialVersionUID = -4746047677764329143L;

    @Schema(example = "Worksite A")
    private String address;
    @Schema(example = "-6.2281729")
    private Double lat;
    @Schema(example = "106.8316069")
    private Double lng;

}
