package id.worx.worx.forms.service.field;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.forms.exception.InvalidParameterException;
import id.worx.worx.forms.service.value.CheckboxGroupValue;
import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class CheckboxGroupField extends Field {

    private static final long serialVersionUID = -4677025279732953493L;

    private static final int MINIMUM_ALLOWED_MIN_CHECKED = 0;
    private static final int MINIMUM_ALLOWED_MAX_CHECKED = 1;

    private List<Option> group;
    @JsonProperty(value = "min_checked")
    private Integer minChecked;
    @JsonProperty(value = "max_checked")
    private Integer maxChecked;

    @JsonCreator
    public CheckboxGroupField(String id, String label, String description, Boolean required,
            Integer minChecked, Integer maxChecked, List<Option> group) {
        super(id, label, description, FieldType.CHECKBOX_GROUP, required);

        int groupSize = group.size();
        if (minChecked < MINIMUM_ALLOWED_MIN_CHECKED || minChecked > groupSize - 1) {
            throw new InvalidParameterException("Allowed minimum checked is from 0 to " + groupSize);
        }

        if (maxChecked < MINIMUM_ALLOWED_MAX_CHECKED || maxChecked > groupSize) {
            throw new InvalidParameterException("Allowed maximum checked is from 1 to " + groupSize);
        }

        if (required.equals(Boolean.TRUE) && minChecked == 0) {
            throw new InvalidParameterException("Combination required: true, min_checked: 0 is not allowed");
        }

        this.group = group;
        this.minChecked = minChecked;
        this.maxChecked = maxChecked;
    }

    public Integer getMinChecked() {
        return minChecked;
    }

    public Integer getMaxChecked() {
        return maxChecked;
    }

    public List<Option> getGroup() {
        return group;
    }

    @JsonIgnore
    public Integer getGroupSize() {
        return this.group.size();
    }

    @Override
    public boolean validate(Value value) {
        if (!(value instanceof CheckboxGroupValue)) {
            return false;
        }

        CheckboxGroupValue checkboxGroupValue = (CheckboxGroupValue) value;
        List<Boolean> checkList = checkboxGroupValue.getValues();

        if (Objects.isNull(checkList)) {
            return this.getRequired().equals(Boolean.FALSE);
        }

        int checkListLength = checkList.size();
        int groupLength = this.group.size();
        if (checkListLength != groupLength) {
            return false;
        }

        long checkedCount = checkList.stream().filter(check -> check).count();
        return checkedCount >= this.minChecked && checkedCount <= this.maxChecked;
    }

}
