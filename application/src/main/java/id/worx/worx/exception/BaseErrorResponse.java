package id.worx.worx.exception;

import id.worx.worx.data.response.BaseResponse;
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
public class BaseErrorResponse extends BaseResponse {

    private static final long serialVersionUID = -1857753099428972744L;

    private ErrorMessage error;

}
