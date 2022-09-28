package id.worx.worx.forms.service.field;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.exception.detail.ErrorDetail;
import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class FileField extends Field {

    private static final long serialVersionUID = 6132138730057928110L;

    @JsonProperty("max_files")
    private Integer maxFiles;
    @JsonProperty("max_file_size")
    private Integer maxFileSize;
    @JsonProperty("min_file_size")
    private Integer minFileSize;
    @JsonProperty("allowed_extensions")
    private List<String> allowedExtensions;

    @JsonCreator
    public FileField(String id, String label, String description, Boolean required, Integer maxFiles,
            Integer maxFileSize, Integer minFileSize, List<String> allowedExtensions) {
        super(id, label, description, FieldType.FILE, required);
        this.maxFiles = maxFiles;
        this.maxFileSize = maxFileSize;
        this.minFileSize = minFileSize;
        this.allowedExtensions = allowedExtensions;
    }

    public Integer getMaxFiles() {
        return maxFiles;
    }

    public Integer getMaxFileSize() {
        return maxFileSize;
    }

    public Integer getMinFileSize() {
        return minFileSize;
    }

    public List<String> getAllowedExtensions() {
        return allowedExtensions;
    }

    @Override
    public List<ErrorDetail> validate(Value value) {
        // TODO Auto-generated method stub
        return List.of();
    }

}
