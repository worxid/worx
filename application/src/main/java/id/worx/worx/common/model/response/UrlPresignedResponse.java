package id.worx.worx.common.model.response;

import java.io.Serializable;

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
public class UrlPresignedResponse implements Serializable {

    private static final long serialVersionUID = -5724711048604102229L;

    private Long id;
    private String mediaId;
    private String name;
    private String url;
    private String path;
    private String mimeType;
    private Long size;

}
