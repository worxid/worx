package id.worx.worx.service.report;

import java.util.List;

import id.worx.worx.common.model.dto.LocationDTO;
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
public class FormContext {

    private String name;
    private String description;

    private String source;
    private String submitDate;
    private LocationDTO submitLocation;

    // private List<FieldContext> fields;

    public String getSubmitAddress() {
        return String.format("<a href=\"https://www.google.com/maps?q=%,.010f,%,.010f\">%s</a>",
                submitLocation.getLat(),
                submitLocation.getLng(),
                submitLocation.getAddress());
    }

}
