package id.worx.worx.common.model.forms.field;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.Value;
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
    public List<ErrorDetail> validate(Value value) {
        return List.of();
    }

}
