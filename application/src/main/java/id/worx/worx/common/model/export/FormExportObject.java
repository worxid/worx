package id.worx.worx.common.model.export;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FormExportObject {

    private List<FormExportEntry> headers;
    private List<List<FormExportEntry>> valueRows;

    public List<String> getHeadersWithQuote() {
        return headers.stream()
                .map(header -> {
                    String value = String.join(",", header.getValues());
                    return String.format("\"%s\"", value);
                })
                .collect(Collectors.toList());
    }

    public List<List<String>> getValueRowsWithQuote() {
        return valueRows.stream()
                .map(valueRow -> {
                    return valueRow.stream()
                            .map(value -> {
                                String valueString = String.join(",", value.getValues());
                                return String.format("\"%s\"", valueString);
                            })
                            .collect(Collectors.toList());
                })
                .collect(Collectors.toList());
    }

}
