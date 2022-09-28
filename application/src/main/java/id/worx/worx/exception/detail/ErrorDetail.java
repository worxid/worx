package id.worx.worx.exception.detail;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.experimental.SuperBuilder;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, visible = true)
@SuperBuilder
public abstract class ErrorDetail implements Serializable {

    private static final long serialVersionUID = 4876035157138012359L;

    private String reason;
    private String description;

    protected ErrorDetail(String reason, String description) {
        this.reason = reason;
        this.description = description;
    }

    public String getReason() {
        return reason;
    }

    public String getDescription() {
        return description;
    }

}
