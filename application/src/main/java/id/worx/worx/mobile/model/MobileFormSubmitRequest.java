package id.worx.worx.mobile.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.common.model.request.FormSubmitRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MobileFormSubmitRequest extends FormSubmitRequest {

    private static final long serialVersionUID = -6837112130102466431L;

    @JsonProperty("device_code")
    private String deviceCode;

}