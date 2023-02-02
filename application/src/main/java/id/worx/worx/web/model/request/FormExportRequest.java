package id.worx.worx.web.model.request;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FormExportRequest implements Serializable {

    private static final long serialVersionUID = 1171133912820375433L;

    @NotNull
    @JsonProperty("form_id")
    private Long formId;

    @JsonProperty("option")
    private String option = "PDF";

}
