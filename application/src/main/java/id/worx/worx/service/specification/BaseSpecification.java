package id.worx.worx.service.specification;

import java.time.Instant;

import org.springframework.data.jpa.domain.Specification;

public interface BaseSpecification<E> {

    public default Specification<E> like(String attributeName, String pattern) {
        return (root, query, cb) -> cb.like(root.get(attributeName), String.format("%%%s%%", pattern));
    }

    public default Specification<E> equalTo(String attributeName, Object object) {
        return (root, query, cb) -> cb.equal(root.get(attributeName), object);
    }

    public default Specification<E> lessThanOrEqualTo(String attributeName, Instant date) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get(attributeName), date);
    }

    public default Specification<E> between(String attributeName,Instant from, Instant to){
        return (root, query, cb) -> cb.between(root.get(attributeName),from,to);
    }

}
