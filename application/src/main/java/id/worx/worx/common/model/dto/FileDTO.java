package id.worx.worx.common.model.dto;

import java.io.InputStream;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileDTO implements Serializable {

    private static final long serialVersionUID = 1710037606278880387L;

    private Long id;
    @JsonProperty("media_id")
    private String mediaId;

    private String name;
    @JsonProperty("original_name")
    private String originalName;

    private String path;
    @JsonProperty("mime_type")
    private String mimeType;
    private Long size;

    private String url;

    @JsonIgnore
    private InputStream content;

}
