package id.worx.worx.forms.service.field;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TextField extends Field {

    private static final long serialVersionUID = -4016732888530143652L;

    @JsonProperty("min_length")
    private Integer minLength;
    @JsonProperty("max_length")
    private Integer maxLength;

    public TextField() {
        super(FieldType.TEXT);
    }

    public TextField(String id, String label, Boolean required, String description, Integer minLength,
            Integer maxLength) {
        super(id, label, description, FieldType.TEXT, required);
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    public Integer getMinLength() {
        return minLength;
    }

    public void setMinLength(Integer minLength) {
        this.minLength = minLength;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

}
