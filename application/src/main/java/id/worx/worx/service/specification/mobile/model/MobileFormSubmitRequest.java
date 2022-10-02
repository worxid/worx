package id.worx.worx.service.specification.mobile.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import id.worx.worx.data.request.FormSubmitRequest;
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
