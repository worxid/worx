package id.worx.worx.model.request;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FieldCondition implements Serializable {
    private String fieldName;
    private Objects searchedValue;
}
