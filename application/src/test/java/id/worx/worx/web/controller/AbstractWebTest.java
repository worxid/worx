package id.worx.worx.web.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@Slf4j
public abstract class AbstractWebTest {

    protected ObjectMapper mapper = new ObjectMapper();

    protected MockMvc mockMvc;

    protected String token;
    protected String refreshToken;
    protected String username;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    public void initWebTest() throws Exception {
        log.info("Setup web test setup");

        if (this.mockMvc == null) {
            this.mockMvc = webAppContextSetup(webApplicationContext)
                    .apply(springSecurity()).build();        }

        log.info("Executed web test setup");
    }

    @AfterEach
    public void teardownWebTest() throws Exception {
        log.info("Executing web test setup");

        if (this.mockMvc == null) {
            this.mockMvc = webAppContextSetup(webApplicationContext)
                    .apply(springSecurity()).build();        }

        log.info("Executed web test setup");
    }

    protected void login(String username, String password) {

    }
}
