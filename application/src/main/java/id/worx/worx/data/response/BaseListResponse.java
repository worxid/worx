package id.worx.worx.data.response;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BaseListResponse<K extends Serializable> implements Serializable {

    private static final long serialVersionUID = -1928366718839540450L;

    @Default
    private Boolean success = true;
    private List<K> list;

}
