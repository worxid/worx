package id.worx.worx.util;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

import com.google.common.base.CaseFormat;
import org.springframework.data.jpa.domain.JpaSort;

public class JpaUtils {

    private JpaUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static Sort replaceSort(Sort sort) {
        List<Order> orders = sort.stream()
                .map(order -> {
                    String property = order.getProperty();
                    property = CaseFormat.LOWER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, property);

                    if (order.getDirection().isAscending()) {
                        return Order.asc(property);
                    } else if (order.getDirection().isDescending()) {
                        return Order.desc(property);
                    }

                    return order;
                })
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    public static Sort replaceSort(Sort sort, Map<String, String> map) {
        List<Order> orders = sort.stream()
                .map(order -> {
                    String property = order.getProperty();
                    if (map.containsKey(property)) {
                        property = map.get(property);
                    } else {
                        property = CaseFormat.LOWER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, property);
                    }

                    if (order.getDirection().isAscending()) {
                        return Order.asc(property);
                    } else if (order.getDirection().isDescending()) {
                        return Order.desc(property);
                    }

                    return order;
                })
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    public static Sort replaceUnsafeSort(Sort sort, Map<String, String> map) {
        Sort newSort = Sort.unsorted();

        for (Order order : sort) {
            String property = order.getProperty();
            if (map.containsKey(order.getProperty())) {
                property = map.get(order.getProperty());
            }

            if (newSort.isEmpty()) {
                newSort = JpaSort.unsafe(order.getDirection(), property);
            } else {
                newSort.and(JpaSort.unsafe(order.getDirection(), property));
            }
        }

        return newSort;
    }
}
