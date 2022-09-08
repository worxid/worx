package id.worx.worx.forms.service.field;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.forms.service.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class SignatureField extends Field {

    private static final long serialVersionUID = 7159651185419123747L;

    @JsonCreator
    public SignatureField(String id, String label, String description, Boolean required) {
        super(id, label, description, FieldType.SIGNATURE, required);
    }

    @Override
    public boolean validate(Value value) {
        // TODO Auto-generated method stub
        return false;
    }

}
