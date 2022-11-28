package id.worx.worx.common.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties({"label","description","fields","values","created_on","modified_on","submit_in_zone"})
public class DashboardStatMapDTO extends FormDTO implements Serializable {
}
