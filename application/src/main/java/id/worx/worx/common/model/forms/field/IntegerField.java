package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.IntegerValue;
import id.worx.worx.common.model.forms.value.Value;

public class IntegerField extends Field {

    private static final long serialVersionUID = 6822989747855727665L;

    @JsonCreator
    public IntegerField(String id, String label, Boolean required, String description) {
        super(id, label, description, FieldType.INTEGER, required);
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

        if (!(value instanceof IntegerValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        IntegerValue booleanValue = (IntegerValue) value;

        if (Objects.isNull(booleanValue.getValue())) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
            return details;
        }

        return details;
    }

}
