package id.worx.worx.service.specification;

import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
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
import id.worx.worx.web.model.request.FormTemplateSearchRequest;

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

    public Specification<FormTemplate> userIdEqualsTo(Long userId) {
        return this.equalTo(FormTemplate_.USER_ID, userId);
    }

    public Specification<FormTemplate> isNotAssignedToAnyGroup() {
        return (root, query, cb) -> cb.isEmpty(root.get(FormTemplate_.ASSIGNED_GROUPS));
    }

    public Specification<FormTemplate> submissionCountEqualTo(Integer submissionCount) {
        return (root, query, cb) -> {
            Root<FormTemplate> template = root;
            Subquery<FormTemplate> subquery = query.subquery(FormTemplate.class);
            Root<FormTemplate> subroot = subquery.from(FormTemplate.class);
            Join<Form, FormTemplate> formSubmission = subroot.join(FormTemplate_.FORMS);
            subquery.select(formSubmission.get(Form_.TEMPLATE).get(FormTemplate_.ID))
                    .groupBy(formSubmission.get(Form_.TEMPLATE).get(FormTemplate_.ID));

            if (submissionCount.equals(0)) {
                return cb.in(template.get(FormTemplate_.ID)).value(subquery).not();
            }

            subquery.having(
                    cb.equal(
                            cb.count(formSubmission.get(Form_.TEMPLATE).get(FormTemplate_.ID)),
                            submissionCount));
            return cb.in(template.get(FormTemplate_.ID)).value(subquery);
        };
    }

    public Specification<FormTemplate> fromSearchRequest(FormTemplateSearchRequest request, Long userId) {

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

        if (userId != null) {
            spec = spec.and(equalTo(FormTemplate_.USER_ID, userId));
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

        if (Objects.nonNull(request.getGlobalSearch())){
            spec= spec.and(globalSearch(request.getGlobalSearch()));
        }

        return spec;
    }

    public Specification<FormTemplate> globalSearch(String globalSearch){
        Specification<FormTemplate> spec= Specification.where(null);

        return spec.or(like(FormTemplate_.LABEL,globalSearch))
            .or(like(FormTemplate_.DESCRIPTION,globalSearch))
            .or(isAssignedToGroup(globalSearch));
    }

}
