package id.worx.worx.common.model.forms.value;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.forms.field.FieldType;

public class DropdownValue extends Value {

    private static final long serialVersionUID = -1248483773997516277L;

    @JsonProperty("value_index")
    private Integer valueIndex;

    public DropdownValue() {
        super(FieldType.DROPDOWN);
    }

    public DropdownValue(Integer valueIndex) {
        super(FieldType.DROPDOWN);
        this.valueIndex = valueIndex;
    }

    public Integer getValueIndex() {
        return valueIndex;
    }

    public void setValueIndex(Integer valueIndex) {
        this.valueIndex = valueIndex;
    }

}
