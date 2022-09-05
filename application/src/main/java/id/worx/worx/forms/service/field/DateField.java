package id.worx.worx.forms.service.field;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DateField extends Field {

    private static final long serialVersionUID = -6841148066373325007L;

    @JsonProperty("disable_future")
    private Boolean disableFuture;
    @JsonProperty("disable_past")
    private Boolean disablePast;

    public DateField() {
        super(FieldType.DATE);
    }

    public DateField(String id, String label, String description, Boolean required,
            Boolean disableFuture, Boolean disablePast) {
        super(id, label, description, FieldType.DATE, required);
        this.disableFuture = disableFuture;
        this.disablePast = disablePast;
    }

    public Boolean getDisableFuture() {
        return disableFuture;
    }

    public void setDisableFuture(Boolean disableFuture) {
        this.disableFuture = disableFuture;
    }

    public Boolean getDisablePast() {
        return disablePast;
    }

    public void setDisablePast(Boolean disablePast) {
        this.disablePast = disablePast;
    }

}
