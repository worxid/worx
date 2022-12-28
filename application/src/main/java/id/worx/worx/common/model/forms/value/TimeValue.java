package id.worx.worx.common.model.forms.value;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import id.worx.worx.common.model.forms.field.FieldType;

public class TimeValue extends Value {

    private static final long serialVersionUID = -4844619641396099306L;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime value;

    public TimeValue() {
        super(FieldType.TIME);
    }

    public TimeValue(LocalTime value) {
        super(FieldType.TIME);
        this.value = value;
    }

    public LocalTime getValue() {
        return value;
    }

}
