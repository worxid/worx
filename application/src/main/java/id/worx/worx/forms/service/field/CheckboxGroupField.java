package id.worx.worx.forms.service.field;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CheckboxGroupField extends Field {

    private static final long serialVersionUID = -4677025279732953493L;

    @JsonProperty("min_checked")
    private Integer minChecked;
    @JsonProperty("max_checked")
    private Integer maxChecked;
    private List<Option> group;

    public CheckboxGroupField() {
        super(FieldType.CHECKBOX_GROUP);
    }

    public CheckboxGroupField(String id, String label, String description, Boolean required,
            Integer minChecked, Integer maxChecked, List<Option> group) {
        super(id, label, description, FieldType.CHECKBOX_GROUP, required);
        this.minChecked = minChecked;
        this.maxChecked = maxChecked;
        this.group = group;
    }

    public Integer getMinChecked() {
        return minChecked;
    }

    public void setMinChecked(Integer minChecked) {
        this.minChecked = minChecked;
    }

    public Integer getMaxChecked() {
        return maxChecked;
    }

    public void setMaxChecked(Integer maxChecked) {
        this.maxChecked = maxChecked;
    }

    public List<Option> getGroup() {
        return group;
    }

    public void setGroup(List<Option> group) {
        this.group = group;
    }

}
