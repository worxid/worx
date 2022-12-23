package id.worx.worx.exception;

import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import id.worx.worx.common.model.response.BaseResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class WorxErrorResponse extends BaseResponse {

    private static final long serialVersionUID = -1857753099428972744L;

    private ErrorMessage error;

    public WorxErrorResponse(ErrorMessage error) {
        super(false);
        this.error = error;
    }

    public static WorxErrorResponse of(WorxErrorCode errorCode, HttpServletRequest request) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .timestamp(new Date())
                .code(errorCode.getHttpStatus().value())
                .error(errorCode)
                .path(request.getRequestURI())
                .details(List.of())
                .build();
        return new WorxErrorResponse(errorMessage);
    }

    public static WorxErrorResponse of(WorxException ex, HttpServletRequest request) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .timestamp(new Date())
                .code(ex.getHttpStatusValue())
                .error(ex.getErrorCode())
                .path(request.getRequestURI())
                .details(ex.getDetails())
                .build();
        return new WorxErrorResponse(errorMessage);
    }

}
