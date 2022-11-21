package id.worx.worx.common.model.export;

import java.util.List;
import java.util.Objects;

import org.springframework.util.Assert;

import lombok.Getter;
import lombok.NonNull;

@Getter
public class FormExportEntry {

    @NonNull
    private List<String> values;
    private List<String> hyperlinks;

    public FormExportEntry(String value) {
        this.values = List.of(value);
    }

    public FormExportEntry(List<String> values) {
        this.values = values;
    }

    public FormExportEntry(List<String> values, List<String> hyperlinks) {
        Assert.isTrue(values.size() == hyperlinks.size(), "hyperlink size must be equal to value size");
        this.values = values;
        this.hyperlinks = hyperlinks;
    }

    public boolean hasHyperlink() {
        return Objects.nonNull(hyperlinks);
    }

    public int size() {
        return values.size();
    }

}
