package id.worx.worx.forms.service.field;

import java.time.LocalDate;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

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
    public boolean validate(Value value) {

        if (Objects.isNull(value)) {
            return this.getRequired().equals(Boolean.FALSE);
        }

        if (!(value instanceof DateValue)) {
            return false;
        }

        DateValue dateValue = (DateValue) value;
        LocalDate now = LocalDate.now();
        LocalDate localDate = dateValue.getValue();

        if (this.disableFuture.equals(Boolean.TRUE) && localDate.isAfter(now)) {
            return false;
        }

        if (this.disablePast.equals(Boolean.TRUE) && localDate.isBefore(now)) {
            return false;
        }

        return true;
    }

}
