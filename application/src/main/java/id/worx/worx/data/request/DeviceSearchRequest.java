package id.worx.worx.data.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceSearchRequest {
    private String label;
    private String deviceModel;
    private String deviceOsVersion;
    private String deviceAppVersion;
    private String deviceLanguage;
    private String deviceCode;
    private String globalSearch;
}
