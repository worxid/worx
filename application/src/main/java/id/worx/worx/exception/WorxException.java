package id.worx.worx.exception;

import lombok.Getter;

import java.util.List;

import org.springframework.http.HttpStatus;

import id.worx.worx.exception.detail.ErrorDetail;

@Getter
public class WorxException extends RuntimeException {

    private static final long serialVersionUID = 3938892930867633897L;

    private final WorxErrorCode errorCode;

    private final List<ErrorDetail> details;

    /**
     * Constructs a new runtime exception with the specified detail message.
     * The cause is not initialized, and may subsequently be initialized by a
     * call to {@link #initCause}.
     *
     * @param message the detail message. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */

    public WorxException(WorxErrorCode errorCode) {
        super(errorCode.getReasonPhrase());
        this.errorCode = errorCode;
        this.details = List.of();
    }

    public WorxException(WorxErrorCode errorCode, List<ErrorDetail> details) {
        super(errorCode.getReasonPhrase());
        this.errorCode = errorCode;
        this.details = details;
    }

    public WorxException(String message, WorxErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.details = List.of();
    }

    public WorxException(String message, WorxErrorCode errorCode, List<ErrorDetail> details) {
        super(message);
        this.errorCode = errorCode;
        this.details = details;
    }

    protected HttpStatus getHttpStatus() {
        return this.errorCode.getHttpStatus();
    }

    protected int getHttpStatusValue() {
        return this.errorCode.getHttpStatus().value();
    }

}
