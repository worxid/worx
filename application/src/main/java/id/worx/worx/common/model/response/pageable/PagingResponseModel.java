package id.worx.worx.common.model.response.pageable;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.Collections;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PagingResponseModel<T> {

    @JsonProperty("total_elements")
    private long totalElements;
    @JsonProperty("page_size")
    private int pageSize;
    @JsonProperty("page_number")
    private int pageNumber;
    private List<T> rows;

    public PagingResponseModel(Page<T> page) {
        if (page == null) {
            page = new PageImpl<>(Collections.emptyList());
        }
        this.totalElements = page.getTotalElements();
        this.pageNumber = page.getNumber();
        this.pageSize = page.getSize();
        this.rows = page.getContent();
    }

}
