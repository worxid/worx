package id.worx.worx.forms.service.field;

public class PhotoField extends Field {

    private static final long serialVersionUID = 7050599105120337475L;

    private Integer maxFiles;
    private Boolean allowGalleryUpload;

    public PhotoField() {
        super(FieldType.PHOTO);
    }

    public PhotoField(String id, String label, String description, Boolean required, Integer maxFiles,
            Boolean allowGalleryUpload) {
        super(id, label, description, FieldType.PHOTO, required);
        this.maxFiles = maxFiles;
        this.allowGalleryUpload = allowGalleryUpload;
    }

    public Integer getMaxFiles() {
        return maxFiles;
    }

    public void setMaxFiles(Integer maxFiles) {
        this.maxFiles = maxFiles;
    }

    public Boolean getAllowGalleryUpload() {
        return allowGalleryUpload;
    }

    public void setAllowGalleryUpload(Boolean allowGalleryUpload) {
        this.allowGalleryUpload = allowGalleryUpload;
    }

}
