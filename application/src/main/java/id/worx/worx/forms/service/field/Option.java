package id.worx.worx.forms.service.field;

import java.io.Serializable;

public class Option implements Serializable {

    private static final long serialVersionUID = -4859063227634796571L;

    private String label;

    public Option() {
    }

    public Option(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

}
