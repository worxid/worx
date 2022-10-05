package id.worx.worx.common.model.response;

import id.worx.worx.common.model.dto.FormTemplateDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class FormTemplateResponse extends BaseResponse {

    private static final long serialVersionUID = 2244557784224518769L;

    private FormTemplateDTO template;

}
