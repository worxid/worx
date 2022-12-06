package id.worx.worx.common.model.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attachment implements Serializable {

    private static final long serialVersionUID = 6421679429127385681L;

    @JsonProperty("file_id")
    private Long fileId;
    @JsonProperty("media_id")
    private String mediaId;
    private String name;
    private String path;

}
