package id.worx.worx.forms.service.field;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.exception.InvalidParameterException;
import id.worx.worx.forms.service.value.TextValue;
import id.worx.worx.forms.service.value.Value;
import lombok.Builder;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class TextField extends Field {

    private static final long serialVersionUID = -4016732888530143652L;

    private static final int MINIMUM_ALLOWED_MIN_LENGTH = 0;
    private static final int MAXIMUM_ALLOWED_MIN_LENGTH = 1024;
    private static final int MINIMUM_ALLOWED_MAX_LENGTH = 1;
    private static final int MAXIMUM_ALLOWED_MAX_LENGTH = 1024;

    @Builder.Default
    @JsonProperty("min_length")
    private Integer minLength = 1;

    @Builder.Default
    @JsonProperty("max_length")
    private Integer maxLength = 1000;

    @JsonCreator
    public TextField(String id, String label, Boolean required, String description, Integer minLength,
            Integer maxLength) {
        super(id, label, description, FieldType.TEXT, required);

        if (minLength < MINIMUM_ALLOWED_MIN_LENGTH || minLength > MAXIMUM_ALLOWED_MIN_LENGTH) {
            throw new InvalidParameterException("Allowed minimum length is from 0 to 1024");
        }

        if (maxLength < MINIMUM_ALLOWED_MAX_LENGTH || maxLength > MAXIMUM_ALLOWED_MAX_LENGTH) {
            throw new InvalidParameterException("Allowed maximum length is from 1 to 1024");
        }

        if (required.equals(Boolean.TRUE) && minLength == 0) {
            throw new InvalidParameterException("Combination required: true, min_length: 0 is not allowed");
        }

        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    public Integer getMinLength() {
        return minLength;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    @Override
    public boolean validate(Value value) {

        if (!(value instanceof TextValue)) {
            return false;
        }

        TextValue textValue = (TextValue) value;
        String text = textValue.getValue();

        if (Objects.isNull(text) && this.getRequired().equals(Boolean.TRUE)) {
            return false;
        }

        Integer textLength = 0;
        boolean isValidLength = true;
        if (Objects.nonNull(text)) {
            textLength = text.length();
        }

        if (textLength < this.minLength) {
            isValidLength = false;
        }

        if (textLength > this.maxLength) {
            isValidLength = false;
        }

        return isValidLength;
    }

}
