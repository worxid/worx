package id.worx.worx.forms.service.value;

import id.worx.worx.forms.service.field.FieldType;

public class RatingValue extends Value {

    private static final long serialVersionUID = -4578111749727954901L;

    private Integer value;

    public RatingValue() {
        super(FieldType.RATING);
    }

    public RatingValue(Integer value) {
        super(FieldType.RATING);
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

}
