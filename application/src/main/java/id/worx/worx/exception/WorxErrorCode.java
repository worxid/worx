package id.worx.worx.exception;

public enum WorxErrorCode {

    /**
     * {@code 1 Database error}
     */
    DATABASE_ERROR(1, "Database error");

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
