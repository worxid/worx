package id.worx.worx.forms.service.value;

import id.worx.worx.forms.service.field.FieldType;

public class TextValue extends Value {

    private static final long serialVersionUID = -6692285555694066579L;

    private String value;

    public TextValue() {
        super(FieldType.TEXT);
    }

    public TextValue(String value) {
        super(FieldType.TEXT);
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
