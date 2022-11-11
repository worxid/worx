package id.worx.worx.service.specification;

import java.util.Objects;
import id.worx.worx.entity.FormTemplate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import id.worx.worx.entity.Audit_;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.Form_;
import id.worx.worx.web.model.request.FormSubmissionSearchRequest;
import javax.persistence.criteria.Join;

@Component
public class FormSpecification implements BaseSpecification<Form> {

    public Specification<Form> fromSearchRequest(FormSubmissionSearchRequest request, Long userId) {
        Specification<Form> spec = Specification.where(null);

        spec= spec.and(getByUserId(userId));
        if (Objects.nonNull(request.getTemplateId())) {
            spec = spec.and(equalTo(Form_.TEMPLATE, request.getTemplateId()));
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

        if(Objects.nonNull(request.getGlobalSearch())){
            spec = spec.and(getGlobalSearch(request.getGlobalSearch()));
        }

        return spec;
    }

    public Specification<Form> getGlobalSearch(String globalSearch){
        Specification<Form> spec = Specification.where(null);
        return spec
            .or(like(Form_.LABEL, globalSearch))
            .or(like(Form_.DESCRIPTION, globalSearch))
            .or(like(Form_.SUBMIT_ADDRESS, globalSearch))
            .or(like(Form_.RESPONDENT_LABEL, globalSearch));
    }

    public Specification<Form> getByUserId(Long userId){
        return (root, query, criteriaBuilder) -> {
            Join<Form,FormTemplate> formFormTemplate= root.join("template");
            return criteriaBuilder.equal(formFormTemplate.get("userId"),userId);
        };
    }

}
