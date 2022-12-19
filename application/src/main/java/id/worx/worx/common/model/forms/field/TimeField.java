package id.worx.worx.common.model.forms.field;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.TimeValue;
import id.worx.worx.common.model.forms.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class TimeField extends Field {

    private static final long serialVersionUID = 4624029400833187233L;

    @JsonCreator
    public TimeField(String id, String label, String description, Boolean required) {
        super(id, label, description, FieldType.TIME, required);
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

        if (!(value instanceof TimeValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        TimeValue timeValue = (TimeValue) value;
        LocalTime localTime = timeValue.getValue();

        if (Objects.isNull(localTime)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
            return details;
        }

        return details;
    }

}
