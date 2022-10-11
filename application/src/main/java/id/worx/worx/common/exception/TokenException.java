package id.worx.worx.common.exception;

public class TokenException extends RuntimeException{

    private final String token;

    public TokenException(String token) {
        super(String.format("Invalid Token [%s] ", token));
        this.token = token;
    }

}
