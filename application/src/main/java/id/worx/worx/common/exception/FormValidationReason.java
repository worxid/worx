package id.worx.worx.common.exception;

public enum FormValidationReason {

    NO_VALUE_ON_REQUIRED("Field is required but has no value."),
    INVALID_FIELD_TYPE("Field value type doesn't match field type"),
    NULL_VALUE("Field value is null."),
    VALUE_INDEX_OUT_OF_BOUND("Value index is out of bounds."),
    INVALID_CHECKLIST_ARRAY_SIZE("Invalid checklist array size."),
    INVALID_RATING_VALUE("Rating value constraint is not met."),
    VALUE_LESS_THAN_MINIMUM("Value is less than minimum."),
    VALUE_MORE_THAN_MAXIMUM("Value is more than maximum."),
    INVALID_REFERENCE("Field contains invalid references."),
    INVALID_FILE_TYPE("Invalid file type."),
    INVALID_FILE_STATE("Invalid file state."),
    INVALID_FILE_SUBMISSION("File is already used for another submission."),
    FUTURE_DATE_DISABLED("Date constraint is not met. Future date is disabled."),
    PAST_DATE_DISABLE("Date constraint is not met. Past date is disabled.");

    private final String reasonPhrase;

    FormValidationReason(String reasonPhrase) {
        this.reasonPhrase = reasonPhrase;
    }

    /**
     * Return the reason phrase of this error code.
     */
    public String getReasonPhrase() {
        return this.reasonPhrase;
    }

}
