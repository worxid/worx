package id.worx.worx.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import id.worx.worx.config.properties.WorxProperties;
import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class StorageConfiguration {

    private final WorxProperties properties;

    @Bean
    public MinioClient storageClient() {
        return MinioClient.builder()
                .endpoint(properties.getStorage().getEndpoint())
                .credentials(
                        properties.getStorage().getAccessKey(),
                        properties.getStorage().getSecretKey())
                .build();
    }

}
