package id.worx.worx.common.model.response;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.value.Value;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FormResponse implements Serializable {

    private static final long serialVersionUID = -4270795191866689219L;

    private List<Field> fields;
    private Map<String, Value> values;

}
