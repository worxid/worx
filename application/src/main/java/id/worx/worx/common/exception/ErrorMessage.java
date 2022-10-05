package id.worx.worx.common.exception;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import id.worx.worx.common.exception.detail.ErrorDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder.Default;

@Getter
@Setter
@Builder
@AllArgsConstructor
@JsonPropertyOrder({ "code", "message", "status", "timestamp", "path", "details" })
public class ErrorMessage implements Serializable {

    private static final long serialVersionUID = -521689203630761613L;

    private int code;
    private Date timestamp;
    private String path;

    @JsonIgnore
    private WorxErrorCode error;

    @Default
    private List<ErrorDetail> details = List.of();

    public String getStatus() {
        return this.error.name();
    }

    public String getMessage() {
        return this.error.getReasonPhrase();
    }

}