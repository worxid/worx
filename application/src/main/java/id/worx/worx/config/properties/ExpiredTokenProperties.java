package id.worx.worx.config.properties;

import lombok.Data;

@Data
public class ExpiredTokenProperties {
    private Integer access;
    private Integer refresh;
}
