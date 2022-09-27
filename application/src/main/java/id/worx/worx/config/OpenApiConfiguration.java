package id.worx.worx.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI titleSpringDoc() {
        Contact contact = new Contact()
                .name("worx")
                .url("worx.id")
                .email("info@worx.id");
        return new OpenAPI()
                .info(new Info()
                        .contact(contact)
                        .title("worx API")
                        .description("worx API")
                        .version("worx API version")
                        .license(new License()
                                .name("MIT License")
                                .url("https://github.com/worxid/worx/blob/main/LICENSE")));
    }

    @Bean
    public GroupedOpenApi webApi() {
        String[] excludePaths = { "/mobile/**" };
        return GroupedOpenApi.builder()
                .group("web")
                .pathsToExclude(excludePaths)
                .build();
    }

    @Bean
    public GroupedOpenApi mobileApi() {
        String[] paths = { "/mobile/**" };
        return GroupedOpenApi.builder()
                .group("mobile")
                .pathsToMatch(paths)
                .build();
    }
}
