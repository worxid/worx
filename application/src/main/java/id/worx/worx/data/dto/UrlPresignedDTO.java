package id.worx.worx.data.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UrlPresignedDTO implements Serializable {

    private static final long serialVersionUID = -5915396131743257221L;

    private String url;
    private String path;

}
