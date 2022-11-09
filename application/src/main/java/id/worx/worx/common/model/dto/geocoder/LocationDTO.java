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
public class LocationDTO implements Serializable {

    private static final long serialVersionUID = 5448564473829461368L;

    private String address;
    private Double lat;
    private Double lng;
    private AddressDetails details;

}
