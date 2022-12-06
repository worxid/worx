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
public class AddressDetails implements Serializable {

    private static final long serialVersionUID = -7129901261905429299L;

    private String country;
    private String province;
    private String locality;
    private String street;
    private String house;
    private String postcode;
    private Bounds bounds;

}
