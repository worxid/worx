package id.worx.worx.forms.service.value;

import java.util.List;

import id.worx.worx.forms.service.field.FieldType;

public class CheckboxGroupValue extends Value {

    private static final long serialVersionUID = 6607241372375789039L;

    private List<Boolean> values;

    public CheckboxGroupValue() {
        super(FieldType.CHECKBOX_GROUP);
    }

    public CheckboxGroupValue(List<Boolean> values) {
        super(FieldType.CHECKBOX_GROUP);
        this.values = values;
    }

    public List<Boolean> getValues() {
        return values;
    }

    public void setValues(List<Boolean> values) {
        this.values = values;
    }

}
