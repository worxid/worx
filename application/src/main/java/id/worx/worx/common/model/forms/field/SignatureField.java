package id.worx.worx.common.model.forms.field;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;

import id.worx.worx.common.exception.detail.ErrorDetail;
import id.worx.worx.common.model.forms.value.Value;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class SignatureField extends Field {

    private static final long serialVersionUID = 7159651185419123747L;

    @JsonCreator
    public SignatureField(String id, String label, String description, Boolean required) {
        super(id, label, description, FieldType.SIGNATURE, required);
    }

    @Override
    public List<ErrorDetail> validate(Value value) {
        // TODO Auto-generated method stub
        return List.of();
    }

}
