package id.worx.worx.util;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

import com.google.common.base.CaseFormat;

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
}
