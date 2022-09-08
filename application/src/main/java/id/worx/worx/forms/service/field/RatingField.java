package id.worx.worx.forms.service.field;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.exception.InvalidParameterException;
import id.worx.worx.forms.service.value.RatingValue;
import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class RatingField extends Field {

    private static final long serialVersionUID = -8828077945547824010L;

    private static final int MINIMUM_ALLOWED_MAX_STARS = 1;

    @JsonProperty("max_stars")
    private Integer maxStars;

    @JsonCreator
    public RatingField(String id, String label, String description, Boolean required,
            Integer maxStars) {
        super(id, label, description, FieldType.RATING, required);

        if (maxStars < MINIMUM_ALLOWED_MAX_STARS) {
            throw new InvalidParameterException("Zero stars are not allowed");
        }

        this.maxStars = maxStars;
    }

    public Integer getMaxStars() {
        return maxStars;
    }

    @Override
    public boolean validate(Value value) {
        if (Objects.isNull(value)) {
            return this.getRequired().equals(Boolean.FALSE);
        }

        if (!(value instanceof RatingValue)) {
            return false;
        }

        RatingValue ratingValue = (RatingValue) value;
        Integer rating = ratingValue.getValue();

        if (rating < 0 || rating > this.maxStars) {
            return false;
        }

        return true;
    }

}
