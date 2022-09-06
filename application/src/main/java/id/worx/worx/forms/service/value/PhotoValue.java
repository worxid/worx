package id.worx.worx.forms.service.value;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.service.field.FieldType;

public class PhotoValue extends Value {

    private static final long serialVersionUID = 6741025300519330409L;

    @JsonProperty("file_ids")
    private List<Long> fileIds;

    public PhotoValue() {
        super(FieldType.PHOTO);
    }

    public PhotoValue(List<Long> fileIds) {
        super(FieldType.PHOTO);
        this.fileIds = fileIds;
    }

    public List<Long> getFileIds() {
        return fileIds;
    }

    public void setFileIds(List<Long> fileIds) {
        this.fileIds = fileIds;
    }

}
