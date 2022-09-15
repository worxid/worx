package id.worx.worx.data.dto;

import java.io.Serializable;

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

    private String address;
    private Double lat;
    private Double lng;

}
