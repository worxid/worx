package id.worx.worx.config.condition;

import java.util.Objects;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

import id.worx.worx.common.WorxConstants;

public class GoogleGeocoderCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        boolean isGeocoderEnabled = context.getEnvironment().getProperty(WorxConstants.ENV_GEOCODER_ENABLED_STRING,
                boolean.class);
        if (!isGeocoderEnabled) {
            return false;
        }

        String apiKey = context.getEnvironment().getProperty(WorxConstants.ENV_GEOCODER_GOOGLE_API_KEY_STRING,
                String.class);

        if (Objects.isNull(apiKey)) {
            return false;
        }

        return !apiKey.isBlank();
    }

}
