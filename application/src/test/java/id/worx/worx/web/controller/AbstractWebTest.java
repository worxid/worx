package id.worx.worx.web.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.util.Arrays;

import org.hamcrest.Matcher;
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
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import id.worx.worx.common.model.request.auth.LoginRequest;
import id.worx.worx.common.model.request.users.UserRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractWebTest {

    protected ObjectMapper mapper = new ObjectMapper();

    protected static final String ADMIN_USER_EMAIL = "testadmin@worx.id";
    protected static final String ADMIN_USER_PASSWORD = "TestAdmin123!";

    protected MediaType contentType = MediaType.APPLICATION_JSON;

    protected MockMvc mockMvc;

    protected String token;
    protected String refreshToken;
    protected String username;

    protected String organizationCode;

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

        // register
        UserRequest request = new UserRequest();
        request.setFullname("testadmin");
        request.setEmail(ADMIN_USER_EMAIL);
        request.setPassword(ADMIN_USER_PASSWORD);
        request.setPhoneNo("62898555907");
        request.setOrganizationName("testadmin");
        request.setCountry("Indonesia");

        createUserAndLogin(request, ADMIN_USER_PASSWORD);

        log.info("Setup web test done");
    }

    @AfterEach
    public void teardownWebTest() throws Exception {
        log.info("Teardown web test");

        log.info("Teardown web test done");
    }

    protected void createUserAndLogin(UserRequest request, String password) throws Exception {

        resetTokens();
        doPost("/api/users/register", request);

        // TODO activate user
        login(ADMIN_USER_EMAIL, ADMIN_USER_PASSWORD);
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
        assertTrue(tokenInfo.has("data"));

        JsonNode tokenData = tokenInfo.get("data");
        assertTrue(tokenData.has("accessToken"));
        assertTrue(tokenData.has("refreshToken"));

        String token = tokenData.get("accessToken").asText();
        String refreshToken = tokenData.get("refreshToken").asText();
        validateJwtToken(token, username);

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
        String subject = claims.get(StandardClaimNames.PREFERRED_USERNAME, String.class);
        assertEquals(username, subject);
    }

    protected ResultActions doGet(String urlTemplate, Object... urlVariables) throws Exception {
        MockHttpServletRequestBuilder getRequest = get(urlTemplate, urlVariables);
        setJwtToken(getRequest);
        return mockMvc.perform(getRequest);
    }

    protected <T> T doGet(String urlTemplate, Class<T> responseClass, Object... urlVariables) throws Exception {
        return readResponse(doGet(urlTemplate, urlVariables).andExpect(status().isOk()), responseClass);
    }

    protected <T> T doGetTyped(String urlTemplate, TypeReference<T> responseType, Object... urlVariables)
            throws Exception {
        return readResponse(doGet(urlTemplate, urlVariables).andExpect(status().isOk()), responseType);
    }

    protected <T> T doPost(String urlTemplate, T content, Class<T> responseClass, String... params) {
        try {
            return readResponse(doPost(urlTemplate, content, params).andExpect(status().isOk()), responseClass);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    protected <T, R> R doPostWithResponse(String urlTemplate, T content, Class<R> responseClass, String... params)
            throws Exception {
        return readResponse(doPost(urlTemplate, content, params).andExpect(status().isOk()), responseClass);
    }

    protected <T, R> R doPostWithTypedResponse(String urlTemplate, T content, TypeReference<R> responseType,
            String... params) throws Exception {
        return readResponse(doPost(urlTemplate, content, params).andExpect(status().isOk()), responseType);
    }

    protected <T, R> R doPostWithTypedResponse(String urlTemplate, T content, TypeReference<R> responseType,
            ResultMatcher resultMatcher, String... params) throws Exception {
        return readResponse(doPost(urlTemplate, content, params).andExpect(resultMatcher), responseType);
    }

    protected <T> ResultActions doPost(String urlTemplate, T content, String... params) throws Exception {
        MockHttpServletRequestBuilder postRequest = post(urlTemplate, (Object[]) params);
        setJwtToken(postRequest);
        String json = json(content);
        postRequest.contentType(contentType).content(json);
        return mockMvc.perform(postRequest);
    }

    protected <T> T doPut(String urlTemplate, T content, Class<T> responseClass, String... params) {
        try {
            return readResponse(doPut(urlTemplate, content, params).andExpect(status().isOk()), responseClass);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    protected <T, R> R doPutWithResponse(String urlTemplate, T content, Class<R> responseClass, String... params)
            throws Exception {
        return readResponse(doPut(urlTemplate, content, params).andExpect(status().isOk()), responseClass);
    }

    protected <T, R> R doPutWithTypedResponse(String urlTemplate, T content, TypeReference<R> responseType,
            String... params) throws Exception {
        return readResponse(doPut(urlTemplate, content, params).andExpect(status().isOk()), responseType);
    }

    protected <T, R> R doPutWithTypedResponse(String urlTemplate, T content, TypeReference<R> responseType,
            ResultMatcher resultMatcher, String... params) throws Exception {
        return readResponse(doPut(urlTemplate, content, params).andExpect(resultMatcher), responseType);
    }

    protected <T> ResultActions doPut(String urlTemplate, T content, String... params) throws Exception {
        MockHttpServletRequestBuilder postRequest = put(urlTemplate, (Object[]) params);
        setJwtToken(postRequest);
        String json = json(content);
        postRequest.contentType(contentType).content(json);
        return mockMvc.perform(postRequest);
    }

    protected ResultActions doDelete(String urlTemplate, String... params) throws Exception {
        MockHttpServletRequestBuilder deleteRequest = delete(urlTemplate);
        setJwtToken(deleteRequest);
        populateParams(deleteRequest, params);
        return mockMvc.perform(deleteRequest);
    }

    protected void populateParams(MockHttpServletRequestBuilder request, String... params) {
        if (params != null && params.length > 0) {
            assertEquals(0, params.length % 2);
            MultiValueMap<String, String> paramsMap = new LinkedMultiValueMap<>();
            for (int i = 0; i < params.length; i += 2) {
                paramsMap.add(params[i], params[i + 1]);
            }
            request.params(paramsMap);
        }
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

    protected <T> T readResponse(ResultActions result, TypeReference<T> type) throws Exception {
        return readResponse(result.andReturn(), type);
    }

    protected <T> T readResponse(MvcResult result, TypeReference<T> type) throws Exception {
        byte[] content = result.getResponse().getContentAsByteArray();
        return mapper.readerFor(type).readValue(content);
    }

    protected static <T> ResultMatcher statusReason(Matcher<T> matcher) {
        return jsonPath("$.error.message", matcher);
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
