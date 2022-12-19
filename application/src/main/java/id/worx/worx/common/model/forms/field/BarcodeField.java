package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.exception.ErrorDetail;
import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.model.forms.value.BarcodeValue;
import id.worx.worx.common.model.forms.value.Value;

public class BarcodeField extends Field {

    private static final long serialVersionUID = 2137880215635830361L;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("barcode_type")
    private BarcodeType barcodeType;

    @JsonProperty("allow_manual_override")
    private Boolean allowManualOverride;

    @JsonCreator
    public BarcodeField(String id, String label, Boolean required, String description, BarcodeType barcodeType,
            Boolean allowManualOverride) {
        super(id, label, description, FieldType.BARCODE, required);

        this.barcodeType = barcodeType;

        this.allowManualOverride = false;
        if (Objects.nonNull(allowManualOverride)) {
            this.allowManualOverride = allowManualOverride;
        }
    }

    public BarcodeType getBarcodeType() {
        return barcodeType;
    }

    public Boolean getAllowManualOverride() {
        return allowManualOverride;
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

        if (!(value instanceof BarcodeValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        BarcodeValue barcodeValue = (BarcodeValue) value;
        String text = barcodeValue.getValue();

        if (Objects.isNull(text) && this.getRequired().equals(Boolean.TRUE)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.NULL_VALUE, this.getId()));
        }

        return details;
    }

}
