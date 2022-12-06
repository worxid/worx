package id.worx.worx.service.geocoder;

import java.io.IOException;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AddressComponent;
import com.google.maps.model.AddressComponentType;
import com.google.maps.model.GeocodingResult;

import id.worx.worx.common.model.dto.geocoder.AddressDetails;
import id.worx.worx.common.model.dto.geocoder.Bounds;
import id.worx.worx.common.model.dto.geocoder.LatLng;
import id.worx.worx.common.model.dto.geocoder.LocationDTO;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class GoogleGeocoderService implements GeocoderService {

    private static final String GEOCODING_API_ERROR_MESSAGE = "There is something wrong with the GeocodingApi.";

    private final GeoApiContext geoApiContext;

    @Override
    public List<LocationDTO> search(String address, boolean withDetails) {
        List<GeocodingResult> results = Arrays.asList(this.geocode(address));
        return results.stream()
                .map(result -> this.toLocationDTO(result, withDetails))
                .collect(Collectors.toList());
    }

    @Override
    public List<LocationDTO> reverse(Double lat, Double lng, boolean withDetails) {
        List<GeocodingResult> results = Arrays.asList(this.reverseGeocode(lat, lng));
        return results.stream()
                .map(result -> this.toLocationDTO(result, withDetails))
                .collect(Collectors.toList());
    }

    private GeocodingResult[] geocode(String address) {
        GeocodingResult[] results = new GeocodingResult[0];

        try {
            results = GeocodingApi.geocode(geoApiContext, address).await();
        } catch (ApiException | IOException e) {
            log.error(GEOCODING_API_ERROR_MESSAGE, e);
            throw new WorxException(WorxErrorCode.INTERNAL_SERVER_ERROR);
        } catch (InterruptedException e) {
            log.error(GEOCODING_API_ERROR_MESSAGE, e);
            Thread.currentThread().interrupt();
            throw new WorxException(WorxErrorCode.INTERNAL_SERVER_ERROR);
        }

        return results;
    }

    private GeocodingResult[] reverseGeocode(double lat, double lng) {
        GeocodingResult[] results = new GeocodingResult[0];

        try {
            results = GeocodingApi.reverseGeocode(geoApiContext, new com.google.maps.model.LatLng(lat, lng)).await();
        } catch (ApiException | IOException e) {
            log.error(GEOCODING_API_ERROR_MESSAGE, e);
            throw new WorxException(WorxErrorCode.INTERNAL_SERVER_ERROR);
        } catch (InterruptedException e) {
            log.error(GEOCODING_API_ERROR_MESSAGE, e);
            Thread.currentThread().interrupt();
            throw new WorxException(WorxErrorCode.INTERNAL_SERVER_ERROR);
        }

        return results;
    }

    private Map<AddressComponentType, String> createAddressComponentMap(AddressComponent[] components) {
        Map<AddressComponentType, String> componentMap = new EnumMap<>(AddressComponentType.class);

        for (AddressComponent component : components) {
            for (AddressComponentType type : component.types) {
                componentMap.put(type, component.longName);
            }
        }

        return componentMap;
    }

    private LocationDTO toLocationDTO(GeocodingResult result, boolean withDetails) {
        LocationDTO locationDTO = LocationDTO.builder()
                .address(result.formattedAddress)
                .lat(result.geometry.location.lat)
                .lng(result.geometry.location.lng)
                .build();

        if (withDetails) {
            Map<AddressComponentType, String> componentMap = createAddressComponentMap(result.addressComponents);
            AddressDetails details = AddressDetails.builder()
                    .country(componentMap.get(AddressComponentType.COUNTRY))
                    .province(componentMap.get(AddressComponentType.ADMINISTRATIVE_AREA_LEVEL_1))
                    .locality(componentMap.get(AddressComponentType.LOCALITY))
                    .street(componentMap.get(AddressComponentType.ROUTE))
                    .house(componentMap.get(AddressComponentType.STREET_NUMBER))
                    .postcode(componentMap.get(AddressComponentType.POSTAL_CODE))
                    .bounds(convertBoundingBox(result.geometry.bounds))
                    .build();
            locationDTO.setDetails(details);
        }

        return locationDTO;
    }

    private Bounds convertBoundingBox(com.google.maps.model.Bounds bounds) {
        if (Objects.isNull(bounds)) {
            return null;
        }

        LatLng nw = LatLng.builder()
                .lat(bounds.northeast.lat)
                .lng(bounds.southwest.lng)
                .build();
        LatLng se = LatLng.builder()
                .lat(bounds.southwest.lat)
                .lng(bounds.northeast.lng)
                .build();

        return Bounds.builder()
                .nw(nw)
                .se(se)
                .build();
    }

}
