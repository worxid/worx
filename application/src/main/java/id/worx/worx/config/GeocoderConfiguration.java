package id.worx.worx.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

import com.google.maps.GeoApiContext;

import id.worx.worx.config.condition.DisabledGeocoderCondition;
import id.worx.worx.config.condition.GoogleGeocoderCondition;
import id.worx.worx.config.properties.WorxProperties;
import id.worx.worx.service.geocoder.DisabledGeocoderService;
import id.worx.worx.service.geocoder.GeocoderService;
import id.worx.worx.service.geocoder.GoogleGeocoderService;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class GeocoderConfiguration {

    private final WorxProperties properties;

    @Bean
    @Conditional(GoogleGeocoderCondition.class)
    public GeocoderService getGoogleGeocoderService() {
        return new GoogleGeocoderService(geoApiContext());
    }

    @Bean
    @Conditional(DisabledGeocoderCondition.class)
    public GeocoderService getDisabledGeocoderService() {
        return new DisabledGeocoderService();
    }

    public GeoApiContext geoApiContext() {
        return new GeoApiContext.Builder()
                .apiKey(properties.getGeocoder().getGoogleApiKey())
                .build();
    }

}
