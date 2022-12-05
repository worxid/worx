package id.worx.worx.common.model.forms.field;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.FormConstants;
import id.worx.worx.common.exception.FormValidationErrorDetail;
import id.worx.worx.common.exception.FormValidationReason;
import id.worx.worx.common.exception.InvalidParameterException;
import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.PhotoValue;
import id.worx.worx.common.model.forms.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class PhotoField extends Field {

    private static final long serialVersionUID = 7050599105120337475L;

    @JsonProperty("max_files")
    private Integer maxFiles;
    @JsonProperty("allow_gallery_upload")
    private Boolean allowGalleryUpload;

    @JsonCreator
    public PhotoField(String id, String label, String description, Boolean required, Integer maxFiles,
            Boolean allowGalleryUpload) {
        super(id, label, description, FieldType.PHOTO, required);

        if (maxFiles > FormConstants.PHOTO_FIELD_MAXIMUM_ALLOWED_MAX_FILES) {
            throw new InvalidParameterException("Maximum number of photos to attach is up to 6");
        }

        this.maxFiles = maxFiles;
        this.allowGalleryUpload = allowGalleryUpload;
    }

    public Integer getMaxFiles() {
        return maxFiles;
    }

    public Boolean getAllowGalleryUpload() {
        return allowGalleryUpload;
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

        if (!(value instanceof PhotoValue)) {
            details.add(new FormValidationErrorDetail(FormValidationReason.INVALID_FIELD_TYPE, this.getId()));
            return details;
        }

        PhotoValue fileValue = (PhotoValue) value;
        List<Long> fileIds = fileValue.getFileIds();

        if (fileIds.size() > this.maxFiles) {
            details.add(new FormValidationErrorDetail(FormValidationReason.VALUE_MORE_THAN_MAXIMUM, this.getId()));
        }

        return details;
    }

}
