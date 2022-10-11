package id.worx.worx.common.model.response;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder.Default;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BaseValueResponse<K extends Serializable> implements Serializable {

    private static final long serialVersionUID = 6976850910196991924L;

    @Default
    private Boolean success = true;
    private K value;

}
