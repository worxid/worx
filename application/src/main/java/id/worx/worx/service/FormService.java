package id.worx.worx.service;

import java.util.List;

import id.worx.worx.data.dto.FormDTO;
import id.worx.worx.data.request.FormSubmitRequest;
import id.worx.worx.entity.Form;

public interface FormService {

    Form submit(FormSubmitRequest request);

    List<Form> list();

    FormDTO toDTO(Form form);

}
