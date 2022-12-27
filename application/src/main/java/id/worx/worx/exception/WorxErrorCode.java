package id.worx.worx.exception;

import org.springframework.http.HttpStatus;

public enum WorxErrorCode {

    /**
     * Database error
     */
    DATABASE_ERROR("Database error", HttpStatus.INTERNAL_SERVER_ERROR),

    /**
     * This error is used to handle unauthorized access to requested resource.
     */
    UNAUTHORIZED("Unauthorized access to requested resource", HttpStatus.UNAUTHORIZED),

    /**
     * This error is used to handle denied permission operation.
     */
    PERMISSION_DENIED("Permission denied", HttpStatus.FORBIDDEN),

    /**
     * This error is used to notify not allowed operation.
     */
    OPERATION_NOT_ALLOWED("This operation is not allowed by default.", HttpStatus.FORBIDDEN),

    /**
     * This error is used to notify disabled feature error.
     */
    FEATURE_DISABLED("This feature is disabled.", HttpStatus.FORBIDDEN),

    /**
     * This error is generic authentication error.
     */
    AUTHENTICATION_FAILURE("Authentication failed", HttpStatus.UNAUTHORIZED),

    /**
     *
     */
    INVALID_USERNAME_PASSWORD("Invalid username or password", HttpStatus.UNAUTHORIZED),

    /**
     *
     */
    JWT_TOKEN_EXPIRED("Token has expired", HttpStatus.UNAUTHORIZED),

    /**
     * {@code Entity not found}
     */
    ENTITY_NOT_FOUND_ERROR("Entity not found", HttpStatus.NOT_FOUND),

    /**
     * {@code Form Validation error}
     */
    FORM_VALIDATION_ERROR("There were errors during content validation", HttpStatus.BAD_REQUEST),

    /**
     * {@code Object Storage error}
     */
    OBJECT_STORAGE_ERROR("Something wrong with the object storage.",
            HttpStatus.INTERNAL_SERVER_ERROR),

    /**
     * {@code Object Storage Upload error} This error is used to notify user to not upload to this
     * path because another file exists.
     */
    OBJECT_STORAGE_UPLOAD_ERROR("Something wrong with the object storage.",
            HttpStatus.FORBIDDEN),

    /**
     *
     */
    PATTERN_PASSWORD_VALIDATION(
            "Character must 8 Character & Combination Uppercase,Lowercase and Special Character [!@#$%^&*_]",
            HttpStatus.BAD_REQUEST),

    /**
     *
     */
    TOKEN_INVALID_ERROR("Invalid Token", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    TOKEN_EMAIL_ERROR("Invalid Validation Token & Email", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    EMAIL_NOT_FOUND("Email Not Found", HttpStatus.NOT_FOUND),

    /**
     *
     */
    PASSWORD_NOT_MATCH("Old Password Doesnt Match", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    USERNAME_EXIST("Username already exist", HttpStatus.NOT_FOUND),


    /**
     *
     */
    USERNAME_EMPTY("Username doesnt exist", HttpStatus.NOT_FOUND),

    /**
     *
     */
    EMAIL_EXIST("Email already exist", HttpStatus.NOT_FOUND),

    /**
     *
     */
    REQUEST_DATA("Please check your request data", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    FAILED_SEND_EMAIL("Failed send email", HttpStatus.BAD_REQUEST),

    /**
     * {@code Invalid organization code error}
     */
    ORGANIZATION_CODE_IS_INVALID("Organization (code) is not exist.", HttpStatus.NOT_FOUND),

    /**
     * {@code Device is registered error}
     */
    DEVICE_ALREADY_REGISTERED("Device is already registered to the Organization (code).",
            HttpStatus.BAD_REQUEST),

    /**
     * {@code Device is registered error}
     */
    DEVICE_NOT_REGISTERED("Device is not registered.", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    INVALID_PHONE_NO("Phone Number must be Number Only", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    REFRESH_TOKEN_NOT_FOUND("Refresh token is not in database!",
            HttpStatus.NOT_FOUND),

    /**
     *
     */
    REFRESH_TOKEN_INVALID("Refresh token was expired. Please make a new signin request",
            HttpStatus.BAD_REQUEST),

    /**
     *
     */
    DEVICE_CODE_INVALID("Invalid device code", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    ALREADY_VERIRIED("Account has been verified", HttpStatus.BAD_REQUEST),

    /**
     *
     */
    TOKEN_EXPIRED_ERROR("There were errors during content validation", HttpStatus.BAD_REQUEST),

    /**
     * This error is used to notify unhandled internal server error.
     */
    INTERNAL_SERVER_ERROR("There is something wrong with the server",
            HttpStatus.INTERNAL_SERVER_ERROR);


    private final String reasonPhrase;

    private final HttpStatus httpStatus;

    WorxErrorCode(String reasonPhrase, HttpStatus httpStatus) {
        this.reasonPhrase = reasonPhrase;
        this.httpStatus = httpStatus;
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
