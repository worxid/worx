package id.worx.worx.util;

import com.google.gson.Gson;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
@Setter
public class JWTValue {
    private String sub;
    private String iss;
    private String iat;
    private String exp;

    public static JWTValue getDecoded(String encodedToken) {
        String[] pieces = encodedToken.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(pieces[1]));

        return new Gson().fromJson(payload, JWTValue.class);
    }
}
