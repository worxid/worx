package id.worx.worx.model.request.devices;

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
public class DeviceSearchRequest extends DeviceRequest implements Serializable {
    private List<String> groups;
    @JsonProperty("global_search")
    private String globalSearch;
    @JsonProperty("joined_time")
    private Instant joinedTime;
}
