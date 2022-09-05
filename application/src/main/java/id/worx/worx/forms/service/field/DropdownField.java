package id.worx.worx.forms.service.field;

import java.util.List;

public class DropdownField extends Field {

    private static final long serialVersionUID = -1298316107118253239L;

    private List<Option> options;

    public DropdownField() {
        super(FieldType.DROPDOWN);
    }

    public DropdownField(String id, String label, String description, Boolean required,
            List<Option> options) {
        super(id, label, description, FieldType.DROPDOWN, required);
        this.options = options;
    }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }

}
