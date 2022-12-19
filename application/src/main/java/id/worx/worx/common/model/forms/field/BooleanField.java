package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.common.exception.ErrorDetail;
import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.model.forms.value.BooleanValue;
import id.worx.worx.common.model.forms.value.Value;

public class BooleanField extends Field {

    private static final long serialVersionUID = 476656236523536677L;

    @JsonCreator
    public BooleanField(String id, String label, Boolean required, String description) {
        super(id, label, description, FieldType.BOOLEAN, required);
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

        if (!(value instanceof BooleanValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        BooleanValue booleanValue = (BooleanValue) value;

        if (Objects.isNull(booleanValue.getValue())) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
            return details;
        }

        return details;
    }

}
