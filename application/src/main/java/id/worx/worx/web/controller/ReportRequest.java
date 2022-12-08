package id.worx.worx.web.controller;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReportRequest implements Serializable {

    private static final long serialVersionUID = 1171133912820375433L;

    @NotNull
    private Long formId;

}
