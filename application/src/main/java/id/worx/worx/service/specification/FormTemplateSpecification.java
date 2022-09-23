package id.worx.worx.service.specification;

import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import id.worx.worx.entity.Audit_;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.FormTemplate_;
import id.worx.worx.entity.Form_;
import id.worx.worx.entity.Group;
import id.worx.worx.entity.Group_;
import id.worx.worx.web.model.FormTemplateSearchRequest;

@Component
public class FormTemplateSpecification implements BaseSpecification<FormTemplate> {

    public Specification<FormTemplate> isAssignedToGroup(String groupName) {
        return (root, query, cb) -> {
            Root<FormTemplate> template = root;
            Subquery<Group> subquery = query.subquery(Group.class);
            Root<Group> group = subquery.from(Group.class);
            Expression<Set<FormTemplate>> groupTemplates = group.get(Group_.TEMPLATES);

            subquery.select(group)
                    .where(
                            cb.equal(group.get(Group_.NAME), groupName),
                            cb.isMember(template, groupTemplates));
            return cb.exists(subquery);
        };
    }

    public Specification<FormTemplate> submissionCountEqualTo(Integer submissionCount) {
        return (root, query, cb) -> {
            Root<FormTemplate> template = root;
            Subquery<Form> subquery = query.subquery(Form.class);
            Root<Form> form = subquery.from(Form.class);
            subquery.select(form)
                    .where(cb.equal(form.get(Form_.TEMPLATE_ID), template.get(FormTemplate_.ID)));
            return cb.equal(cb.count(subquery), submissionCount);
        };
    }

    public Specification<FormTemplate> fromSearchRequest(FormTemplateSearchRequest request) {

        Specification<FormTemplate> spec = Specification.where(null);

        if (Objects.nonNull(request.getLabel())) {
            spec = spec.and(like(FormTemplate_.LABEL, request.getLabel()));
        }

        if (Objects.nonNull(request.getDescription())) {
            spec = spec.and(like(FormTemplate_.DESCRIPTION, request.getDescription()));
        }

        if (Objects.nonNull(request.getCreatedOn())) {
            spec = spec.and(lessThanOrEqualTo(Audit_.CREATED_ON, request.getCreatedOn()));
        }

        if (Objects.nonNull(request.getModifiedOn())) {
            spec = spec.and(lessThanOrEqualTo(Audit_.MODIFIED_ON, request.getModifiedOn()));
        }

        if (Objects.nonNull(request.getAssignedGroups())) {
            List<String> groupNames = request.getAssignedGroups();
            Specification<FormTemplate> groupSpec = Specification.where(null);

            for (String groupName : groupNames) {
                groupSpec = groupSpec.and(isAssignedToGroup(groupName));
            }

            spec = spec.and(groupSpec);
        }

        if (Objects.nonNull(request.getSubmissionCount())) {
            spec = spec.and(submissionCountEqualTo(request.getSubmissionCount()));
        }

        return spec;
    }

}
