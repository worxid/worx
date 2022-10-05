package id.worx.worx.common.model.forms.value;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import id.worx.worx.common.model.forms.field.FieldType;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type", visible = true)
@JsonSubTypes({
        @Type(value = TextValue.class, name = "text"),
        @Type(value = CheckboxGroupValue.class, name = "checkbox_group"),
        @Type(value = DropdownValue.class, name = "dropdown"),
        @Type(value = RadioGroupValue.class, name = "radio_group"),
        @Type(value = DateValue.class, name = "date"),
        @Type(value = RatingValue.class, name = "rating"),
        @Type(value = FileValue.class, name = "file"),
        @Type(value = PhotoValue.class, name = "photo"),
        @Type(value = SignatureValue.class, name = "signature"),
        @Type(value = SeparatorValue.class, name = "separator")
})
public abstract class Value implements Serializable {

    private static final long serialVersionUID = -3803729965422889888L;

    private FieldType type;

    protected Value(FieldType type) {
        this.type = type;
    }

    public FieldType getType() {
        return type;
    }

    public void setType(FieldType type) {
        this.type = type;
    }

}
