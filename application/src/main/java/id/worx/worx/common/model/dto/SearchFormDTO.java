package id.worx.worx.common.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties({
    "label",
    "description"
})
@Setter
@Getter
public class SearchFormDTO extends FormDTO{
}
