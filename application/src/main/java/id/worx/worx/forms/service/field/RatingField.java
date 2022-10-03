package id.worx.worx.forms.service.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.exception.detail.ErrorDetail;
import id.worx.worx.forms.exception.FormValidationErrorDetail;
import id.worx.worx.forms.exception.FormValidationReason;
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
    public List<ErrorDetail> validate(Value value) {
        List<ErrorDetail> details = new ArrayList<>();

        if (Objects.isNull(value)) {
            if (this.getRequired().equals(Boolean.TRUE)) {
                details.add(new FormValidationErrorDetail(FormValidationReason.NO_VALUE_ON_REQUIRED, this.getId()));
            }

            return details;
        }

        if (!(value instanceof RatingValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        RatingValue ratingValue = (RatingValue) value;
        Integer rating = ratingValue.getValue();

        if (Objects.isNull(rating) && this.getRequired().equals(Boolean.TRUE)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
        }

        if (rating < 0 || rating > this.maxStars) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_RATING_VALUE, this.getId()));
        }

        return details;
    }

}
