package id.worx.worx.common.model.dto;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIncludeProperties({
        "id",
        "label",
        "description"
})
@Setter
@Getter
public class SimpleFormTemplateDTO extends FormTemplateDTO {

    private static final long serialVersionUID = 7239615658065661387L;

    public static SimpleFormTemplateDTO from(FormTemplateDTO templateDTO) {
        SimpleFormTemplateDTO dto = new SimpleFormTemplateDTO();
        dto.setId(templateDTO.getId());
        dto.setFields(templateDTO.getFields());
        dto.setAssignedGroups(templateDTO.getAssignedGroups());
        dto.setCreatedOn(templateDTO.getCreatedOn());
        dto.setDescription(templateDTO.getDescription());
        dto.setIsDefaultForm(templateDTO.getIsDefaultForm());
        dto.setLabel(templateDTO.getLabel());
        dto.setModifiedOn(templateDTO.getModifiedOn());
        dto.setSubmissionCount(templateDTO.getSubmissionCount());
        dto.setSubmitInZone(templateDTO.getSubmitInZone());
        return dto;
    }

}
