package id.worx.worx.config.security;

import org.springframework.security.core.AuthenticationException;

public class JwtExpiredTokenException extends AuthenticationException {

    private static final long serialVersionUID = -1200741354800398884L;

    private final String token;

    public JwtExpiredTokenException(String msg) {
        super(msg);
        this.token = null;
    }

    public JwtExpiredTokenException(String token, String msg, Throwable t) {
        super(msg, t);
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }

}
