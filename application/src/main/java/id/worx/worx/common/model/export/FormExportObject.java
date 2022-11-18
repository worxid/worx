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
                .map(header -> String.format("\"%s\"", header.getValue()))
                .collect(Collectors.toList());
    }

    public List<List<String>> getValueRowsWithQuote() {
        return valueRows.stream()
                .map(valueRow -> {
                    return valueRow.stream()
                            .map(value -> String.format("\"%s\"", value.getValue()))
                            .collect(Collectors.toList());
                })
                .collect(Collectors.toList());
    }

}
