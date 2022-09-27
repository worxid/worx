package id.worx.worx.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.data.request.FormSubmitRequest;
import id.worx.worx.entity.Form;
import id.worx.worx.mobile.model.MobileFormSubmitRequest;
import id.worx.worx.web.model.FormSubmissionSearchRequest;

public interface FormService {

    Page<Form> search(FormSubmissionSearchRequest request, Pageable pageable);

    Form submit(FormSubmitRequest request);

    Form submit(MobileFormSubmitRequest request);

    List<Form> list();

    List<Form> list(String deviceCode);

    FormDTO toDTO(Form form);

}
