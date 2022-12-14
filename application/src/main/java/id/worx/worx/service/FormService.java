package id.worx.worx.service;

import java.util.List;

import id.worx.worx.common.model.dto.SearchFormDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.request.FormSubmitRequest;
import id.worx.worx.entity.Form;
import id.worx.worx.mobile.model.MobileFormDTO;
import id.worx.worx.mobile.model.MobileFormSubmitRequest;
import id.worx.worx.web.model.request.FormSearchRequest;

public interface FormService {

    Page<Form> search(FormSearchRequest request, Pageable pageable);

    Form submit(FormSubmitRequest request);

    Form submit(MobileFormSubmitRequest request);

    List<Form> list();

    List<Form> list(String deviceCode);

    FormDTO toDTO(Form form);

    SearchFormDTO toSearchFormDTO(Form form);

    MobileFormDTO toMobileFormDTO(Form form);

    Form getById(Long id);
}
