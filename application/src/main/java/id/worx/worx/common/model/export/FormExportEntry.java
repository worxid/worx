package id.worx.worx.common.model.export;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class FormExportEntry {

    @NonNull
    private String value;
    private String hyperlink;

    public boolean hasHyperlink() {
        return Objects.nonNull(hyperlink);
    }

}
