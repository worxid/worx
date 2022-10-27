package id.worx.worx.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.maps.GeoApiContext;

import id.worx.worx.config.properties.WorxProperties;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class GoogleApiConfiguration {

    private final WorxProperties properties;

    @Bean
    public GeoApiContext geoApiContext() {
        return new GeoApiContext.Builder()
                .apiKey(properties.getGeocoder().getGoogleApiKey())
                .build();
    }
}
