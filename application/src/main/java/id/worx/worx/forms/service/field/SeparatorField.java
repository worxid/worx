package id.worx.worx.forms.service.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import id.worx.worx.forms.service.value.SeparatorValue;
import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@JsonIgnoreProperties({ "required" })
@SuperBuilder
public class SeparatorField extends Field {

    private static final long serialVersionUID = -3759320479136054037L;

    private String icon;

    @JsonCreator
    public SeparatorField(String id, String label, String description, String icon) {
        super(id, label, description, FieldType.SEPARATOR, false);
        this.icon = icon;
    }

    public String getIcon() {
        return icon;
    }

    @Override
    public boolean validate(Value value) {
        return value instanceof SeparatorValue;
    }

}
