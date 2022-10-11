package id.worx.worx.common.model.response;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({
        "pageable",
        "number",
        "numberOfElements",
        "first",
        "last",
        "empty"
})
public class BasePageResponse<T> extends PageImpl<T> {

    private static final long serialVersionUID = 7030035710460675888L;

    @JsonCreator
    public BasePageResponse(@JsonProperty("content") final List<T> content,
            @JsonProperty("totalElements") final long totalElements,
            @JsonProperty("totalPages") final int totalPages,
            @JsonProperty("page") final int page,
            @JsonProperty("size") final int size,
            @JsonProperty("sort") final List<String> sort) {
        super(content, PageRequest.of(page, size, Sort.by(
                sort.stream()
                        .map(el -> el.split(","))
                        .map(ar -> new Sort.Order(Sort.Direction.fromString(ar[1]), ar[0]))
                        .collect(Collectors.toList()))),
                totalElements);
    }

    public BasePageResponse(final List<T> content, final Pageable pageable, final long totalElements) {
        super(content, pageable, totalElements);
    }

    public int getPage() {
        return getNumber();
    }

    @JsonProperty("sort")
    public List<String> getSortList() {
        return getSort().stream()
                .map(order -> order.getProperty() + "," + order.getDirection().name())
                .collect(Collectors.toList());
    }

}