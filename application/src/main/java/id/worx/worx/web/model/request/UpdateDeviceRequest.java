package id.worx.worx.web.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDeviceRequest implements Serializable {

    @JsonProperty("device_no")
    private Long deviceNo;
    @JsonProperty("device_model")
    @NotEmpty
    private String deviceModel;
    @NotEmpty
    @JsonProperty("device_os_version")
    private String deviceOsVersion;
    @NotEmpty
    @JsonProperty("device_app_version")
    private String deviceAppVersion;
    @NotEmpty
    @JsonProperty("device_language")
    private String deviceLanguage;
    @NotEmpty
    private Integer port;
    @NotEmpty
    private String ip;
    @NotEmpty
    private String label;
    @JsonProperty("group_ids")
    private List<Long> groupIds;
}
