package id.worx.worx.forms.service.field;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type", visible = true)
@JsonSubTypes({
        @Type(value = TextField.class, name = "text"),
        @Type(value = CheckboxGroupField.class, name = "checkbox_group"),
        @Type(value = DropdownField.class, name = "dropdown"),
        @Type(value = RadioGroupField.class, name = "radio_group"),
        @Type(value = DateField.class, name = "date"),
        @Type(value = RatingField.class, name = "rating"),
        @Type(value = FileField.class, name = "file"),
        @Type(value = PhotoField.class, name = "photo"),
        @Type(value = SignatureField.class, name = "signature"),
        @Type(value = SeparatorField.class, name = "separator")
})
public abstract class Field implements Serializable {

    private static final long serialVersionUID = 8333279687442055062L;

    private String id;
    private String label;
    private String description;
    private FieldType type;
    private Boolean required = false;

    protected Field(FieldType type) {
        this.type = type;
    }

    protected Field(String id, String label, String description, FieldType type, Boolean required) {
        this.id = id;
        this.label = label;
        this.description = description;
        this.type = type;
        this.required = required;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FieldType getType() {
        return type;
    }

    public void setType(FieldType type) {
        this.type = type;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

}
