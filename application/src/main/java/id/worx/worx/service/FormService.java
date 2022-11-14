package id.worx.worx.service;

import java.util.List;

import id.worx.worx.common.model.dto.SearchFormDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.request.FormSubmitRequest;
import id.worx.worx.entity.Form;
import id.worx.worx.mobile.model.MobileFormSubmitRequest;
import id.worx.worx.web.model.request.FormSubmissionSearchRequest;

public interface FormService {

    Page<Form> search(FormSubmissionSearchRequest request, Pageable pageable);

    Form submit(FormSubmitRequest request);

    Form submit(MobileFormSubmitRequest request);

    List<Form> list();

    List<Form> list(String deviceCode);

    FormDTO toDTO(Form form);

    SearchFormDTO toSearchFormDTO(Form form);

}
