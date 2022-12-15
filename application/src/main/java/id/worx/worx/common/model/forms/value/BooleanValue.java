package id.worx.worx.common.model.forms.value;

import id.worx.worx.common.model.forms.field.FieldType;

public class BooleanValue extends Value {

    private static final long serialVersionUID = -4333070730134360114L;

    private Boolean value;

    public BooleanValue() {
        super(FieldType.BOOLEAN);
    }

    public BooleanValue(Boolean value) {
        super(FieldType.BOOLEAN);
        this.value = value;
    }

    public Boolean getValue() {
        return value;
    }

}
