package id.worx.worx.web.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InviteDeviceRequest {
    @JsonProperty("send_to")
    String[] sendTo;
}
