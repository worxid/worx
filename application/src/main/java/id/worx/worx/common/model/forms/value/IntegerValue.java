package id.worx.worx.common.model.forms.value;

import id.worx.worx.common.model.forms.field.FieldType;

public class IntegerValue extends Value {

    private static final long serialVersionUID = -6139155886956256434L;

    private Integer value;

    public IntegerValue() {
        super(FieldType.INTEGER);
    }

    public IntegerValue(Integer value) {
        super(FieldType.BOOLEAN);
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }

}
