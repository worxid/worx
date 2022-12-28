package id.worx.worx.common.model.forms.value;

import id.worx.worx.common.model.forms.field.FieldType;

public class BarcodeValue extends Value {

    private static final long serialVersionUID = 1809126367089099900L;

    private String value;

    public BarcodeValue() {
        super(FieldType.BARCODE);
    }

    public BarcodeValue(String value) {
        super(FieldType.BARCODE);
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
