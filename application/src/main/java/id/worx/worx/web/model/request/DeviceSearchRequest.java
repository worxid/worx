package id.worx.worx.web.model.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceSearchRequest implements Serializable {

    private static final long serialVersionUID = -412072042324853097L;

    private String label;
    @JsonProperty("device_code")
    private String deviceCode;
    @JsonProperty("device_model")
    private String deviceModel;
    @JsonProperty("device_language")
    private String deviceLanguage;
    @JsonProperty("device_os_version")
    private String deviceOsVersion;
    @JsonProperty("device_app_version")
    private String deviceAppVersion;
    private List<String> groups;
    @JsonProperty("global_search")
    private String globalSearch;
    @JsonProperty("joined_time")
    private Instant joinedTime;
}
