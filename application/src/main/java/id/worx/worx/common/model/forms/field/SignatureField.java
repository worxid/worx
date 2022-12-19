package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.common.exception.ErrorDetail;
import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.model.forms.value.SignatureValue;
import id.worx.worx.common.model.forms.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class SignatureField extends Field {

    private static final long serialVersionUID = 7159651185419123747L;

    @JsonCreator
    public SignatureField(String id, String label, String description, Boolean required) {
        super(id, label, description, FieldType.SIGNATURE, required);
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

        if (!(value instanceof SignatureValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        return details;
    }

}
