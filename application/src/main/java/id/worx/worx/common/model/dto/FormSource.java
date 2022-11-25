package id.worx.worx.common.model.dto;

import java.io.Serializable;

import id.worx.worx.entity.RespondentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FormSource implements Serializable {

    private static final long serialVersionUID = 7859260053460719756L;

    private RespondentType type;
    private String label;

}
