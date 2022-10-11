package id.worx.worx.common.model.request.device;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApproveRequest implements Serializable {

    private static final long serialVersionUID = -1053979249569755205L;

    @NotNull
    @JsonProperty("is_approved")
    private Boolean isApproved;

}
