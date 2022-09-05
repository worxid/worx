package id.worx.worx.forms.service.field;

public class SignatureField extends Field {

    private static final long serialVersionUID = 7159651185419123747L;

    public SignatureField() {
        super(FieldType.SIGNATURE);
    }

    public SignatureField(String id, String label, String description, Boolean required) {
        super(id, label, description, FieldType.SIGNATURE, required);
    }

}
