package id.worx.worx.forms.service.value;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.service.field.FieldType;

public class SignatureValue extends Value {

    private static final long serialVersionUID = -5574638058533755770L;

    @JsonProperty("file_id")
    private Long fileId;

    public SignatureValue() {
        super(FieldType.SIGNATURE);
    }

    public SignatureValue(Long fileId) {
        super(FieldType.SIGNATURE);
        this.fileId = fileId;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

}
