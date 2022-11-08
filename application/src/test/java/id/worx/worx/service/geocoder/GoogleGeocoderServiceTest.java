package id.worx.worx.service.geocoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AddressComponent;
import com.google.maps.model.AddressComponentType;
import com.google.maps.model.AddressType;
import com.google.maps.model.Bounds;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.Geometry;
import com.google.maps.model.LatLng;

import id.worx.worx.common.model.dto.geocoder.LocationDTO;

@ExtendWith(MockitoExtension.class)
class GoogleGeocoderServiceTest {

    @Mock
    GeoApiContext geoApiContext;

    private GoogleGeocoderService geocoderService;

    @BeforeAll
    static void prepare() {
        mockStatic(GeocodingApi.class);
    }

    @BeforeEach
    void init() {
        geocoderService = new GoogleGeocoderService(geoApiContext);
    }

    @Test
    void givenAddress_whenSearch_thenReturn() throws ApiException, InterruptedException, IOException {
        String address = "Monumen Nasional";
        double lat = -6.1753924;
        double lng = 106.8271528;
        boolean withDetails = true;

        LatLng latLng = new LatLng(lat, lng);
        Geometry geometry = new Geometry();
        geometry.location = latLng;

        GeocodingResult simpleGeocodingResult = new GeocodingResult();
        simpleGeocodingResult.types = new AddressType[] { AddressType.LOCALITY };
        simpleGeocodingResult.formattedAddress = address;
        simpleGeocodingResult.geometry = geometry;
        simpleGeocodingResult.addressComponents = new AddressComponent[0];

        LatLng latLng2 = new LatLng(lat, lng);
        Bounds bounds = new Bounds();
        bounds.northeast = latLng2;
        bounds.southwest = latLng2;
        AddressComponent component = new AddressComponent();
        component.longName = address;
        component.types = new AddressComponentType[] { AddressComponentType.LOCALITY };

        Geometry geometry2 = new Geometry();
        geometry2.location = latLng;
        geometry2.bounds = bounds;

        GeocodingResult detailGeocodingResult = new GeocodingResult();
        detailGeocodingResult.types = new AddressType[] { AddressType.LOCALITY };
        detailGeocodingResult.formattedAddress = address;
        detailGeocodingResult.geometry = geometry2;
        detailGeocodingResult.addressComponents = new AddressComponent[] { component };

        GeocodingResult[] expectedResults = new GeocodingResult[] { simpleGeocodingResult, detailGeocodingResult };

        GeocodingApiRequest geocodingApiRequest = mock(GeocodingApiRequest.class);
        when(geocodingApiRequest.await()).thenReturn(expectedResults);

        when(GeocodingApi.geocode(geoApiContext, address)).thenReturn(geocodingApiRequest);

        List<LocationDTO> actualResult = geocoderService.search(address, withDetails);

        assertEquals(expectedResults.length, actualResult.size());
        assertEquals(lat, actualResult.get(0).getLat());
        assertEquals(lng, actualResult.get(0).getLng());
    }

    @Test
    void givenLatLng_whenReverse_thenReturn() throws ApiException, InterruptedException, IOException {
        String address = "Monumen Nasional";
        double lat = -6.1753924;
        double lng = 106.8271528;
        boolean withDetails = false;

        LatLng latLng = new LatLng(lat, lng);
        Geometry geometry = new Geometry();
        geometry.location = latLng;
        GeocodingResult geocodingResult = new GeocodingResult();
        geocodingResult.types = new AddressType[] { AddressType.LOCALITY };
        geocodingResult.formattedAddress = address;
        geocodingResult.geometry = geometry;
        geocodingResult.addressComponents = new AddressComponent[0];

        GeocodingResult[] expectedResults = new GeocodingResult[] { geocodingResult };

        GeocodingApiRequest geocodingApiRequest = mock(GeocodingApiRequest.class);
        when(geocodingApiRequest.await()).thenReturn(expectedResults);

        when(GeocodingApi.reverseGeocode(geoApiContext, latLng)).thenReturn(geocodingApiRequest);

        List<LocationDTO> actualResult = geocoderService.reverse(lat, lng, withDetails);

        assertEquals(expectedResults.length, actualResult.size());
        assertEquals(lat, actualResult.get(0).getLat());
        assertEquals(lng, actualResult.get(0).getLng());

    }
}
