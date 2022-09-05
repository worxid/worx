package id.worx.worx.forms.service.field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "required" })
public class SeparatorField extends Field {

    private static final long serialVersionUID = -3759320479136054037L;

    private String icon;

    public SeparatorField() {
        super(FieldType.SEPARATOR);
    }

    public SeparatorField(String id, String label, String description, Boolean required, String icon) {
        super(id, label, description, FieldType.SEPARATOR, required);
        this.icon = icon;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

}
