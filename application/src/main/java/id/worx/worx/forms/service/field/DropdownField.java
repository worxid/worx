package id.worx.worx.forms.service.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.exception.detail.ErrorDetail;
import id.worx.worx.forms.exception.FormValidationErrorDetail;
import id.worx.worx.forms.exception.FormValidationReason;
import id.worx.worx.forms.service.value.DropdownValue;
import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class DropdownField extends Field {

    private static final long serialVersionUID = -1298316107118253239L;

    private List<Option> options;

    @JsonCreator
    public DropdownField(String id, String label, String description, Boolean required,
            List<Option> options) {
        super(id, label, description, FieldType.DROPDOWN, required);
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

        if (!(value instanceof DropdownValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        DropdownValue dropdownValue = (DropdownValue) value;
        Integer valueIndex = dropdownValue.getValueIndex();

        if (Objects.isNull(valueIndex) && this.getRequired().equals(Boolean.TRUE)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
        }

        if (valueIndex < 0 || valueIndex >= this.options.size()) {
            details.add(new FormValidationErrorDetail(FormValidationReason.VALUE_INDEX_OUT_OF_BOUND, this.getId()));
        }

        return details;
    }

}
