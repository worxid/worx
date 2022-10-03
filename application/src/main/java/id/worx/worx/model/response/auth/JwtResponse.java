package id.worx.worx.model.response.auth;


import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class JwtResponse {
    private Integer status;
    private Object data;
    private Object error;

    public JwtResponse() {
        this.status = HttpStatus.OK.value();
        this.data = data;
        this.error = error;
    }
}
