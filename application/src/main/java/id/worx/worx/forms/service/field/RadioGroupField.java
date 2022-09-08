package id.worx.worx.forms.service.field;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.forms.service.value.RadioGroupValue;
import id.worx.worx.forms.service.value.Value;
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
    public boolean validate(Value value) {
        if (Objects.isNull(value)) {
            return this.getRequired().equals(Boolean.FALSE);
        }

        if (!(value instanceof RadioGroupValue)) {
            return false;
        }

        RadioGroupValue radioGroupValue = (RadioGroupValue) value;
        Integer valueIndex = radioGroupValue.getValueIndex();

        if (valueIndex < 0 || valueIndex >= this.options.size()) {
            // value index out of bound
            return false;
        }

        return true;
    }

}
