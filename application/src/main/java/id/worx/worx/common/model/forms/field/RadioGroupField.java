package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.RadioGroupValue;
import id.worx.worx.common.model.forms.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class RadioGroupField extends Field {

    private static final long serialVersionUID = -3629948245911220024L;

    private List<Option> options;

    @JsonCreator
    public RadioGroupField(String id, String label, String description, Boolean required,
            List<Option> options) {
        super(id, label, description, FieldType.RADIO_GROUP, required);
        this.options = options;
    }

    public List<Option> getOptions() {
        return options;
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

        if (!(value instanceof RadioGroupValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        RadioGroupValue radioGroupValue = (RadioGroupValue) value;
        int valueIndex = radioGroupValue.getValueIndex();

        if (Objects.isNull(valueIndex) && this.getRequired().equals(Boolean.TRUE)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
            return details;
        }

        if (valueIndex < 0 || valueIndex >= this.options.size()) {
            details.add(new FormValidationErrorDetail(FormValidationReason.VALUE_INDEX_OUT_OF_BOUND, this.getId()));
        }

        return details;
    }

}
