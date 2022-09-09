package id.worx.worx.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ErrorMessage {
    private Date timestamp;
    private int status;
    private String error;
    private Object message;
    private String path;
}