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
    FORM_VALIDATION_ERROR(12, "There were errors during content validation", HttpStatus.BAD_REQUEST),

    /**
     * {@code Object Storage error}
     */
    OBJECT_STORAGE_ERROR(12, "Something wrong with the object storage.", HttpStatus.INTERNAL_SERVER_ERROR),

    /**
     * {@code Object Storage Upload error}
     * This error is used to notify user to not upload to this path because another file exists.
     */
    OBJECT_STORAGE_UPLOAD_ERROR(12, "Something wrong with the object storage.", HttpStatus.FORBIDDEN),

    PATTERN_PASSWORD_VALIDATION(14,
            "Character must 8 Character & Combination Uppercase,Lowercase and Special Character [!@#$%^&*_]",
            HttpStatus.BAD_REQUEST),

    TOKEN_INVALID_ERROR(15, "Invalid Token", HttpStatus.BAD_REQUEST),
    TOKEN_EMAIL_ERROR(16, "Invalid Validation Token & Email", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_FOUND(17, "Email Not Found", HttpStatus.NOT_FOUND),
    PASSWORD_NOT_MATCH(18, "Old Password Doesnt Match", HttpStatus.BAD_REQUEST),
    USERNAME_EXIST(19, "Username already exist", HttpStatus.NOT_FOUND),
    USERNAME_EMPTY(23, "Username doesnt exist", HttpStatus.NOT_FOUND),
    EMAIL_EXIST(20, "Email already exist", HttpStatus.NOT_FOUND),
    REQUEST_DATA(21, "Please check your request data", HttpStatus.BAD_REQUEST),
    FAILED_SEND_EMAIL(22, "Failed send email", HttpStatus.BAD_REQUEST),

    /**
     * {@code Invalid organization code error}
     */
    ORGANIZATION_CODE_IS_INVALID(22, "Organization (code) is not exist.", HttpStatus.NOT_FOUND),

    /**
     * {@code Device is registered error}
     */
    DEVICE_ALREADY_REGISTERED(22, "Device is already registered to the Organization (code).", HttpStatus.BAD_REQUEST),

    /**
     * {@code Device is registered error}
     */
    DEVICE_NOT_REGISTERED(22, "Device is not registered.", HttpStatus.BAD_REQUEST),

    INVALID_PHONE_NO(23, "Phone Number must be Number Only", HttpStatus.BAD_REQUEST),
    REFRESH_TOKEN_NOT_FOUND(24, "Refresh token is not in database!", HttpStatus.NOT_FOUND),
    REFRESH_TOKEN_INVALID(25, "Refresh token was expired. Please make a new signin request", HttpStatus.BAD_REQUEST),
    DEVICE_CODE_INVALID(25, "Invalid device code", HttpStatus.BAD_REQUEST),
    TOKEN_EXPIRED_ERROR(13, "There were errors during content validation", HttpStatus.BAD_REQUEST),

    /**
     * {@code Internal server error}
     * This error is used to notify unhandled internal server error.
     */
    INTERNAL_SERVER_ERROR(26, "There is something wrong with the Server", HttpStatus.INTERNAL_SERVER_ERROR);

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
