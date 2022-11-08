package id.worx.worx.service.geocoder;

import java.util.List;

import id.worx.worx.common.model.dto.geocoder.LocationDTO;

public interface GeocoderService {

    List<LocationDTO> search(String address, boolean withDetails);

    List<LocationDTO> reverse(Double lat, Double lng, boolean withDetails);

}
