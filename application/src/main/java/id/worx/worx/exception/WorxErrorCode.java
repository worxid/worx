package id.worx.worx.exception;

import org.springframework.http.HttpStatus;

public enum WorxErrorCode {

    /**
     * {@code 1 Database error}
     */
    DATABASE_ERROR(1, "Database error", HttpStatus.INTERNAL_SERVER_ERROR),

    /**
     * {@code Entity not found}
     */
    ENTITY_NOT_FOUND_ERROR(11, "Entity not found", HttpStatus.NOT_FOUND),

    /**
     * {@code Form Validation error}
     */
    FORM_VALIDATION_ERROR(12, "There were errors during content validation", HttpStatus.BAD_REQUEST);

    private final int errorCode;

    private final String reasonPhrase;

    private final HttpStatus httpStatus;

    WorxErrorCode(int errorCode, String reasonPhrase, HttpStatus httpStatus) {
        this.errorCode = errorCode;
        this.reasonPhrase = reasonPhrase;
        this.httpStatus = httpStatus;
    }

    /**
     * Return the integer value of this error code.
     */
    public int getErrorCode() {
        return this.errorCode;
    }

    /**
     * Return the reason phrase of this error code.
     */
    public String getReasonPhrase() {
        return this.reasonPhrase;
    }

    /**
     * Return the HTTP status code object.
     *
     * @return
     */
    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }
}
