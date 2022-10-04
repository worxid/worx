package id.worx.worx.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "worx")
@Getter
@Setter
public class WorxProperties {
    private MailProperties mail;
    private StorageProperties storage;
}
