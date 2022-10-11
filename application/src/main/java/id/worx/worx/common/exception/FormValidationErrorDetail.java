package id.worx.worx.common.exception;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.exception.detail.ErrorDetail;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class FormValidationErrorDetail extends ErrorDetail {

    private static final long serialVersionUID = 7671944654711081658L;

    @JsonProperty("field_id")
    private String fieldId;

    public FormValidationErrorDetail(String reason, String description, String fieldId) {
        super(reason, description);
        this.fieldId = fieldId;
    }

    public FormValidationErrorDetail(FormValidationReason reason, String fieldId) {
        super(reason.name(), reason.getReasonPhrase());
        this.fieldId = fieldId;
    }

    public String getFieldId() {
        return fieldId;
    }

}
