package id.worx.worx.forms.service.field;

import java.util.List;

public class RadioGroupField extends Field {

    private static final long serialVersionUID = -3629948245911220024L;

    private List<Option> options;

    public RadioGroupField() {
        super(FieldType.RADIO_GROUP);
    }

    public RadioGroupField(String id, String label, String description, Boolean required,
            List<Option> options) {
        super(id, label, description, FieldType.RADIO_GROUP, required);
        this.options = options;
    }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }

}
