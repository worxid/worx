package id.worx.worx.common.model.forms.field;

import com.fasterxml.jackson.annotation.JsonValue;

public enum FieldType {

    /**
     * Text field
     */
    TEXT("text"),

    /**
     * Checkbox group field
     */
    CHECKBOX_GROUP("checkbox_group"),

    /**
     * Dropdown field
     */
    DROPDOWN("dropdown"),

    /**
     * Radio group field
     */
    RADIO_GROUP("radio_group"),

    /**
     * Date field
     */
    DATE("date"),

    /**
     * Rating field
     */
    RATING("rating"),

    /**
     * File field
     */
    FILE("file"),

    /**
     * Photo field
     */
    PHOTO("photo"),

    /**
     * Signature field
     */
    SIGNATURE("signature"),

    /**
     * Separator field
     */
    SEPARATOR("separator");

    private final String text;

    FieldType(String text) {
        this.text = text;
    }

    @JsonValue
    public String getText() {
        return this.text;
    }

}
