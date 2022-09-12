package id.worx.worx.data.request;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.value.Value;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SubmitRequest implements Serializable {

    private static final long serialVersionUID = -3556171749946635051L;

    private List<Field> fields;
    private Map<String,Value> values;

}
