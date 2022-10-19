package id.worx.worx.config.properties;

import lombok.Data;

@Data
public class StorageProperties {
    private String endpoint;
    private String accessKey;
    private String secretKey;
    private String bucketName;
}
