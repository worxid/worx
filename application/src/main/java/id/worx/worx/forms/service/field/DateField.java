package id.worx.worx.forms.service.field;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.exception.detail.ErrorDetail;
import id.worx.worx.forms.exception.FormValidationErrorDetail;
import id.worx.worx.forms.exception.FormValidationReason;
import id.worx.worx.forms.service.value.DateValue;
import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class DateField extends Field {

    private static final long serialVersionUID = -6841148066373325007L;

    @JsonProperty("disable_future")
    private Boolean disableFuture;
    @JsonProperty("disable_past")
    private Boolean disablePast;

    @JsonCreator
    public DateField(String id, String label, String description, Boolean required,
            Boolean disableFuture, Boolean disablePast) {
        super(id, label, description, FieldType.DATE, required);
        this.disableFuture = disableFuture;
        this.disablePast = disablePast;
    }

    public Boolean getDisableFuture() {
        return disableFuture;
    }

    public Boolean getDisablePast() {
        return disablePast;
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

        if (!(value instanceof DateValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        DateValue dateValue = (DateValue) value;
        LocalDate now = LocalDate.now();
        LocalDate localDate = dateValue.getValue();

        if (Objects.isNull(localDate)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
            return details;
        }

        if (this.disableFuture.equals(Boolean.TRUE) && localDate.isAfter(now)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.FUTURE_DATE_DISABLED, this.getId()));
        }

        if (this.disablePast.equals(Boolean.TRUE) && localDate.isBefore(now)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.PAST_DATE_DISABLE, this.getId()));
        }

        return details;
    }

}
