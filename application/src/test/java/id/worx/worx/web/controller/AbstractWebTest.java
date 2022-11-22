package id.worx.worx.web.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.util.Arrays;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpInputMessage;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import id.worx.worx.common.model.request.auth.LoginRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractWebTest {

    protected ObjectMapper mapper = new ObjectMapper();

    protected MediaType contentType = MediaType.APPLICATION_JSON;

    protected MockMvc mockMvc;

    protected String token;
    protected String refreshToken;
    protected String username;

    @SuppressWarnings("rawtypes")
    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @SuppressWarnings("rawtypes")
    private HttpMessageConverter stringHttpMessageConverter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.stream(converters)
                .filter(converter -> converter instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .get();

        this.stringHttpMessageConverter = Arrays.stream(converters)
                .filter(converter -> converter instanceof StringHttpMessageConverter)
                .findAny()
                .get();

        assertNotNull(this.mappingJackson2HttpMessageConverter, "the JSON message converter must not be null");
    }

    @BeforeEach
    public void initWebTest() throws Exception {
        log.info("Setup web test start");

        if (this.mockMvc == null) {
            this.mockMvc = webAppContextSetup(webApplicationContext)
                    .apply(springSecurity()).build();
        }

        log.info("Setup web test done");
    }

    @AfterEach
    public void teardownWebTest() throws Exception {
        log.info("Teardown web test");

        log.info("Teardown web test done");
    }

    protected void login(String username, String password) throws Exception {
        resetTokens();
        JsonNode tokenInfo = readResponse(
                doPost("/api/users/login", new LoginRequest(username, password)).andExpect(status().isOk()),
                JsonNode.class);
        validateAndSetJwtToken(tokenInfo, username);
    }

    protected void validateAndSetJwtToken(JsonNode tokenInfo, String username) {
        assertNotNull(tokenInfo);
        assertTrue(tokenInfo.has("token"));
        assertTrue(tokenInfo.has("refreshToken"));
        String token = tokenInfo.get("token").asText();
        String refreshToken = tokenInfo.get("refreshToken").asText();
        validateJwtToken(token, username);
        validateJwtToken(refreshToken, username);
        this.token = token;
        this.refreshToken = refreshToken;
        this.username = username;
    }

    protected void validateJwtToken(String token, String username) {
        assertNotNull(token);
        assertFalse(token.isEmpty());
        int i = token.lastIndexOf('.');
        assertTrue(i > 0);
        String withoutSignature = token.substring(0, i + 1);
        Jwt<Header, Claims> jwsClaims = Jwts.parser().parseClaimsJwt(withoutSignature);
        Claims claims = jwsClaims.getBody();
        String subject = claims.getSubject();
        assertEquals(username, subject);
    }

    protected <T> ResultActions doPost(String urlTemplate, T content, String... params) throws Exception {
        MockHttpServletRequestBuilder postRequest = post(urlTemplate, (Object[]) params);
        setJwtToken(postRequest);
        String json = json(content);
        postRequest.contentType(contentType).content(json);
        return mockMvc.perform(postRequest);
    }

    @SuppressWarnings("unchecked")
    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();

        HttpMessageConverter converter = o instanceof String ? stringHttpMessageConverter
                : mappingJackson2HttpMessageConverter;
        converter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }

    @SuppressWarnings("unchecked")
    protected <T> T readResponse(ResultActions result, Class<T> responseClass) throws Exception {
        byte[] content = result.andReturn().getResponse().getContentAsByteArray();
        MockHttpInputMessage mockHttpInputMessage = new MockHttpInputMessage(content);
        HttpMessageConverter converter = responseClass.equals(String.class) ? stringHttpMessageConverter
                : mappingJackson2HttpMessageConverter;
        return (T) converter.read(responseClass, mockHttpInputMessage);
    }

    protected void resetTokens() {
        this.token = null;
        this.refreshToken = null;
        this.username = null;
    }

    protected void setJwtToken(MockHttpServletRequestBuilder request) {
        if (this.token != null) {
            request.header(HttpHeaders.AUTHORIZATION, "Bearer " + this.token);
        }
    }
}
