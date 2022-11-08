package id.worx.worx.config.condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

public class DisabledGeocoderCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        boolean isGeocoderEnabled = context.getEnvironment().getProperty("worx.geocoder.enabled", boolean.class);
        return !isGeocoderEnabled;
    }

}
