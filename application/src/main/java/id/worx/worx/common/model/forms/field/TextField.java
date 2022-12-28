package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.TextValue;
import id.worx.worx.common.model.forms.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class TextField extends Field {

    private static final long serialVersionUID = -4016732888530143652L;

    private static final int MINIMUM_ALLOWED_MIN_LENGTH = 0;
    private static final int MINIMUM_ALLOWED_MAX_LENGTH = 1;
    private static final int MAXIMUM_ALLOWED_MAX_LENGTH = 1024;

    @JsonProperty("min_length")
    private Integer minLength;

    @JsonProperty("max_length")
    private Integer maxLength;

    @JsonCreator
    public TextField(String id, String label, Boolean required, String description) {
        super(id, label, description, FieldType.TEXT, required);

        if (required.equals(Boolean.TRUE)) {
            this.minLength = MINIMUM_ALLOWED_MAX_LENGTH;
        } else {
            this.minLength = MINIMUM_ALLOWED_MIN_LENGTH;
        }

        this.maxLength = MAXIMUM_ALLOWED_MAX_LENGTH;
    }

    public Integer getMinLength() {
        return minLength;
    }

    public Integer getMaxLength() {
        return maxLength;
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

        if (!(value instanceof TextValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        TextValue textValue = (TextValue) value;
        String text = textValue.getValue();

        if (Objects.isNull(text) && this.getRequired().equals(Boolean.TRUE)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
        }

        Integer textLength = 0;
        if (Objects.nonNull(text)) {
            textLength = text.length();
        }

        if (textLength < this.minLength) {
            details.add(new FormValidationErrorDetail(FormValidationReason.VALUE_LESS_THAN_MINIMUM, this.getId()));
        }

        if (textLength > this.maxLength) {
            details.add(new FormValidationErrorDetail(FormValidationReason.VALUE_MORE_THAN_MAXIMUM, this.getId()));
        }

        return details;
    }

}
