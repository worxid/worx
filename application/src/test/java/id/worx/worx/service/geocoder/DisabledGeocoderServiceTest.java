package id.worx.worx.service.geocoder;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import id.worx.worx.exception.WorxException;

@ExtendWith(MockitoExtension.class)
class DisabledGeocoderServiceTest {

    private DisabledGeocoderService geocoderService;

    @BeforeEach
    void init() {
        geocoderService = new DisabledGeocoderService();
    }

    @Test
    void givenAddress_whenSearch_thenThrowWorxException() {
        String address = "my home";
        boolean withDetails = false;
        assertThrows(WorxException.class, () -> geocoderService.search(address, withDetails));
    }

    @Test
    void givenLatLng_whenReverse_thenThrowWorxException() {
        Double lat = -6.30;
        Double lng = 106.80;
        boolean withDetails = false;
        assertThrows(WorxException.class, () -> geocoderService.reverse(lat, lng, withDetails));
    }
}
