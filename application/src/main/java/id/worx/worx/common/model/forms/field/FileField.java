package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.FileValue;
import id.worx.worx.common.model.forms.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class FileField extends Field {

    private static final long serialVersionUID = 6132138730057928110L;

    @JsonProperty("max_files")
    private Integer maxFiles;
    @JsonProperty("max_file_size")
    private Integer maxFileSize;
    @JsonProperty("file_max_size_type")
    private String fileMaxSizeType;
    @JsonProperty("min_file_size")
    private Integer minFileSize;
    @JsonProperty("file_min_size_type")
    private String fileMinSizeType;
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
        List<ErrorDetail> details = new ArrayList<>();

        if (Objects.isNull(value)) {
            if (this.getRequired().equals(Boolean.TRUE)) {
                details.add(new FormValidationErrorDetail(FormValidationReason.NO_VALUE_ON_REQUIRED, this.getId()));
            }

            return details;
        }

        if (!(value instanceof FileValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        FileValue fileValue = (FileValue) value;
        List<Long> fileIds = fileValue.getFileIds();

        if (fileIds.size() > this.maxFiles) {
            details.add(new FormValidationErrorDetail(FormValidationReason.VALUE_MORE_THAN_MAXIMUM, this.getId()));
        }

        return details;
    }

}
