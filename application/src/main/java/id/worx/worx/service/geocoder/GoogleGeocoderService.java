package id.worx.worx.service.geocoder;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoogleGeocoderService implements GeocoderService {

    private final GeoApiContext geoApiContext;

    @Override
    public GeocodingResult[] search(String address) {
        GeocodingResult[] results = this.geocode(address);
        return results;
    }

    @Override
    public String reverse(Double lat, Double lng) {
        // TODO Auto-generated method stub
        return null;
    }

    private GeocodingResult[] geocode(String address) {
        GeocodingResult[] results = new GeocodingResult[0];

        try {
            results = GeocodingApi.geocode(geoApiContext, address).await();
        } catch (ApiException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return results;
    }

}
