package id.worx.worx.mobile.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import id.worx.worx.common.model.dto.FormDTO;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MobileFormDTO extends FormDTO {

    private static final long serialVersionUID = -1864851112669256719L;

}
