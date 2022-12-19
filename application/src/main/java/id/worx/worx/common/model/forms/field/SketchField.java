package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.common.exception.ErrorDetail;
import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.model.forms.value.SketchValue;
import id.worx.worx.common.model.forms.value.Value;

public class SketchField extends Field {

    private static final long serialVersionUID = 5374087554857871627L;

    @JsonCreator
    public SketchField(String id, String label, String description, Boolean required) {
        super(id, label, description, FieldType.SKETCH, required);
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

        if (!(value instanceof SketchValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        return details;
    }
}
