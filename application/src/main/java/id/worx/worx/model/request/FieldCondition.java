package id.worx.worx.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FieldCondition implements Serializable {
    @JsonProperty("field_name")
    private String fieldName;
    @JsonProperty("searched_value")
    private Objects searchedValue;
}
