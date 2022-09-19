package id.worx.worx.data.request;

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
public class FormShareRequest implements Serializable {

    private static final long serialVersionUID = 4085332954576289385L;

    @NotEmpty
    private List<String> recipients;

}
