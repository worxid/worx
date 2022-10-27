package id.worx.worx.service.geocoder;

import com.google.maps.model.GeocodingResult;

public interface GeocoderService {

    GeocodingResult[] search(String address);

    String reverse(Double lat, Double lng);

}
