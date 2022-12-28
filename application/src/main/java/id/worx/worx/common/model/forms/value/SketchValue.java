package id.worx.worx.common.model.forms.value;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.forms.field.FieldType;

public class SketchValue extends Value {

    private static final long serialVersionUID = -7804809643853499166L;

    @JsonProperty("file_id")
    private Long fileId;

    public SketchValue() {
        super(FieldType.SKETCH);
    }

    public SketchValue(Long fileId) {
        super(FieldType.SKETCH);
        this.fileId = fileId;

    }

    public Long getFileId() {
        return fileId;
    }

}
