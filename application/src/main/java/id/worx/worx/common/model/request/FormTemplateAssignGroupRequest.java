package id.worx.worx.common.model.request;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FormTemplateAssignGroupRequest implements Serializable {

    private static final long serialVersionUID = 6590908496158592036L;

    private List<Long> assignedGroups;

}
