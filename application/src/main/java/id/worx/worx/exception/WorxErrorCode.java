package id.worx.worx.exception;

public enum WorxErrorCode {

    /**
     * {@code 1 Database error}
     */
    DATABASE_ERROR(1, "Database error"),

    /**
     * {@code 2 Form Validation error}
     */
    FORM_VALIDATION_ERROR(202, "There were errors during content validation");

    private final int errorCode;

    private final String reasonPhrase;

    WorxErrorCode(int errorCode, String reasonPhrase) {
        this.errorCode = errorCode;
        this.reasonPhrase = reasonPhrase;
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
}
