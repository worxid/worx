package id.worx.worx.data.response;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
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

    private ErrorMessage status;

}

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class ErrorMessage implements Serializable {

    private static final long serialVersionUID = 8688183005554931769L;

    private Integer code;
    private String description;
}
