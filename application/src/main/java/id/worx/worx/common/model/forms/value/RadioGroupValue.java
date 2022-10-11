package id.worx.worx.common.model.forms.value;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.forms.field.FieldType;

public class RadioGroupValue extends Value {

    private static final long serialVersionUID = 2673788925691346003L;

    @JsonProperty("value_index")
    private Integer valueIndex;

    public RadioGroupValue() {
        super(FieldType.RADIO_GROUP);
    }

    public RadioGroupValue(Integer valueIndex) {
        super(FieldType.RADIO_GROUP);
        this.valueIndex = valueIndex;
    }

    public Integer getValueIndex() {
        return valueIndex;
    }

    public void setValueIndex(Integer valueIndex) {
        this.valueIndex = valueIndex;
    }

}
