package id.worx.worx.web.model.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import id.worx.worx.entity.FileState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileDTO implements Serializable {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("path")
    private String path;
    @JsonProperty("media_id")
    private String mediaId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("original_name")
    private String originalName;
    @JsonProperty("mime_type")
    private String mimeType;
    @JsonProperty("size")
    private long size;
    @JsonProperty("state")
    private FileState state;
    @JsonProperty("user_id")
    private Long userId;


}
