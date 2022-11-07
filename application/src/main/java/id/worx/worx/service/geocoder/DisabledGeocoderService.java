package id.worx.worx.service.geocoder;

import java.util.List;

import id.worx.worx.common.model.dto.geocoder.LocationDTO;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;

public class DisabledGeocoderService implements GeocoderService {

    @Override
    public List<LocationDTO> search(String address, boolean withDetails) {
        throw new WorxException(WorxErrorCode.FEATURE_DISABLED);
    }

    @Override
    public List<LocationDTO> reverse(Double lat, Double lng, boolean withDetails) {
        throw new WorxException(WorxErrorCode.FEATURE_DISABLED);
    }

}
