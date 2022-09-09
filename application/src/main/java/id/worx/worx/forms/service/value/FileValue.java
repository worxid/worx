package id.worx.worx.forms.service.value;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.service.field.FieldType;

public class FileValue extends Value {

    private static final long serialVersionUID = 8828580811941743820L;

    @JsonProperty("file_ids")
    private List<Long> fileIds;

    public FileValue() {
        super(FieldType.FILE);
    }

    public FileValue(List<Long> fileIds) {
        super(FieldType.FILE);
        this.fileIds = fileIds;
    }

    public List<Long> getFileIds() {
        return fileIds;
    }

    public void setFileIds(List<Long> fileIds) {
        this.fileIds = fileIds;
    }

}
