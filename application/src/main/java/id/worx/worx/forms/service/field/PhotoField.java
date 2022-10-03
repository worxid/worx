package id.worx.worx.forms.service.field;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.exception.detail.ErrorDetail;
import id.worx.worx.forms.exception.InvalidParameterException;
import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class PhotoField extends Field {

    private static final long serialVersionUID = 7050599105120337475L;

    private static final int MAXIMUM_ALLOWED_MAX_FILES = 6;

    @JsonProperty("max_files")
    private Integer maxFiles;
    @JsonProperty("allow_gallery_upload")
    private Boolean allowGalleryUpload;

    @JsonCreator
    public PhotoField(String id, String label, String description, Boolean required, Integer maxFiles,
            Boolean allowGalleryUpload) {
        super(id, label, description, FieldType.PHOTO, required);

        if (maxFiles > MAXIMUM_ALLOWED_MAX_FILES) {
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
        // TODO Auto-generated method stub
        return List.of();
    }

}
