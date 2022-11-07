package id.worx.worx.config.condition;

import java.util.Objects;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GoogleGeocoderCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        log.info("{}", context.getEnvironment().getProperty("worx.geocoder.enabled", boolean.class));
        boolean isGeocoderEnabled = context.getEnvironment().getProperty("worx.geocoder.enabled", boolean.class);
        if (!isGeocoderEnabled) {
            return false;
        }

        String apiKey = context.getEnvironment().getProperty("worx.geocoder.google-api-key", String.class);

        if (Objects.isNull(apiKey)) {
            return false;
        }

        return !apiKey.isBlank();
    }

}
