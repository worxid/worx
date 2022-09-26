package id.worx.worx.service.specification;

import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import id.worx.worx.entity.Audit_;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.Form_;
import id.worx.worx.web.model.FormSubmissionSearchRequest;

@Component
public class FormSpecification implements BaseSpecification<Form> {

    public Specification<Form> fromSearchRequest(FormSubmissionSearchRequest request) {
        Specification<Form> spec = Specification.where(null);

        if (Objects.nonNull(request.getTemplateId())) {
            spec = spec.and(equalTo(Form_.TEMPLATE_ID, request.getTemplateId()));
        }

        if (Objects.nonNull(request.getLabel())) {
            spec = spec.and(like(Form_.LABEL, request.getLabel()));
        }

        if (Objects.nonNull(request.getDescription())) {
            spec = spec.and(like(Form_.DESCRIPTION, request.getDescription()));
        }

        if (Objects.nonNull(request.getCreatedOn())) {
            spec = spec.and(lessThanOrEqualTo(Audit_.CREATED_ON, request.getCreatedOn()));
        }

        if (Objects.nonNull(request.getModifiedOn())) {
            spec = spec.and(lessThanOrEqualTo(Audit_.MODIFIED_ON, request.getModifiedOn()));
        }

        if (Objects.nonNull(request.getSubmitDate())) {
            spec = spec.and(lessThanOrEqualTo(Form_.SUBMIT_DATE, request.getSubmitDate()));
        }

        if (Objects.nonNull(request.getSubmitAddress())) {
            spec = spec.and(like(Form_.SUBMIT_ADDRESS, request.getSubmitAddress()));
        }

        if (Objects.nonNull(request.getRespondentLabel())) {
            spec = spec.and(like(Form_.RESPONDENT_LABEL, request.getRespondentLabel()));
        }

        return spec;
    }

}
