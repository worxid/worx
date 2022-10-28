package id.worx.worx.common.model.dto.geocoder;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LatLng implements Serializable {

    private static final long serialVersionUID = -7254222632096547232L;

    private double lat;
    private double lng;

}
