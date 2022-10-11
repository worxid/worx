package id.worx.worx.common.model.request;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotEmpty;

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
public class MultipleDeleteRequest implements Serializable {

    private static final long serialVersionUID = -3324295764869544502L;

    @NotEmpty
    private List<Long> ids;

}
