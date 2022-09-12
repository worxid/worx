package id.worx.worx.data.response;

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
public class BaseResponse implements Serializable {

    private static final long serialVersionUID = -7613351314636172501L;

    @Default
    private Boolean success = true;

}
