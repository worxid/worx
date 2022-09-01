package id.worx.worx.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class WorxException extends RuntimeException {

    private static final long serialVersionUID = 3938892930867633897L;

    private final int statusCode;

    protected HttpStatus getHttpStatus() {
        return HttpStatus.valueOf(this.statusCode);
    }

    /**
     * Constructs a new runtime exception with the specified detail message.
     * The cause is not initialized, and may subsequently be initialized by a
     * call to {@link #initCause}.
     *
     * @param message the detail message. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */
    public WorxException(String message) {
        super(message);
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    }

    public WorxException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

}
