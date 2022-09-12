package id.worx.worx.forms.service.field;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

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
    public boolean validate(Value value) {
        if (!(value instanceof DropdownValue)) {
            return false;
        }

        DropdownValue dropdownValue = (DropdownValue) value;
        Integer valueIndex = dropdownValue.getValueIndex();

        if (Objects.isNull(valueIndex)) {
            return this.getRequired().equals(Boolean.FALSE);
        }

        if (valueIndex < 0 || valueIndex >= this.options.size()) {
            // value index out of bound
            return false;
        }

        return true;
    }

}
