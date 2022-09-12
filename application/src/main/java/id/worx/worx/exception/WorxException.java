package id.worx.worx.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class WorxException extends RuntimeException {

    private final int statusCode;

    protected HttpStatus getHttpStatus(){
        return HttpStatus.valueOf(this.statusCode);
    }

    public WorxException(String message) {
        super(message);
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    }

    public WorxException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
