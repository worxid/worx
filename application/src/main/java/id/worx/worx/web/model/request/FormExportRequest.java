package id.worx.worx.web.model.request;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import id.worx.worx.common.model.export.ExportOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FormExportRequest implements Serializable {

    private static final long serialVersionUID = 7931578054469361249L;

    @NotNull
    private Long templateId;
    @NotNull
    private ExportOption option;

}
