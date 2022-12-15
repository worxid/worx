package id.worx.worx.common.model.forms.field;

import com.fasterxml.jackson.annotation.JsonValue;

public enum BarcodeType {
    ALL_BARCODE("all"), BARCODE_1D("1d"), BARCODE_2D("2d");

    private final String text;

    BarcodeType(String text) {
        this.text = text;
    }

    @JsonValue
    public String getText() {
        return this.text;
    }
}
