package id.worx.worx.forms.service.value;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import id.worx.worx.forms.service.field.FieldType;

public class DateValue extends Value {

    private static final long serialVersionUID = -2804070526503721630L;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate value;

    public DateValue() {
        super(FieldType.DATE);
    }

    public DateValue(LocalDate value) {
        super(FieldType.DATE);
        this.value = value;
    }

    public LocalDate getValue() {
        return value;
    }

    public void setValue(LocalDate value) {
        this.value = value;
    }

}
