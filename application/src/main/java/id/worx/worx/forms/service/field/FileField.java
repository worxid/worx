package id.worx.worx.forms.service.field;

import java.util.List;

public class FileField extends Field {

    private static final long serialVersionUID = 6132138730057928110L;

    private Integer maxFiles;
    private Integer maxFileSize;
    private Integer minFileSize;
    private List<String> allowedExtensions;

    public FileField() {
        super(FieldType.FILE);
    }

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

    public void setMaxFiles(Integer maxFiles) {
        this.maxFiles = maxFiles;
    }

    public Integer getMaxFileSize() {
        return maxFileSize;
    }

    public void setMaxFileSize(Integer maxFileSize) {
        this.maxFileSize = maxFileSize;
    }

    public Integer getMinFileSize() {
        return minFileSize;
    }

    public void setMinFileSize(Integer minFileSize) {
        this.minFileSize = minFileSize;
    }

    public List<String> getAllowedExtensions() {
        return allowedExtensions;
    }

    public void setAllowedExtensions(List<String> allowedExtensions) {
        this.allowedExtensions = allowedExtensions;
    }

}
