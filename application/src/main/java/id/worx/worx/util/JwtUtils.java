package id.worx.worx.util;

import id.worx.worx.entity.users.Users;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class JwtUtils {

    private static String secret = "This_is_secret";
    private static long expiryDuration = 24* 60 * 60 * 1000;

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expiryDuration))
            .signWith(SignatureAlgorithm.HS256, secret).compact();
    }
    public String generateJwt(Users users){

        return Jwts.builder()
            .setSubject(users.getId() + ", " + users.getEmail())
            .setIssuer("AUTH")
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiryDuration))
            .addClaims(Map.of(StandardClaimNames.PREFERRED_USERNAME, users.getEmail()))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }

    public boolean validateAccessToken(String token){

        try{
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        }catch (ExpiredJwtException ex){
            log.error("JWT Token expired : {} ", ex.getMessage());
        }catch (IllegalArgumentException ex){
            log.error("Token is null, empty or has only whitespace ", ex.getMessage());
        }catch (MalformedJwtException ex){
            log.error("JWT is invalid ", ex.getMessage());
        }catch (UnsupportedJwtException ex){
            log.error("JWT is not supported ",  ex.getMessage());
        }catch (SignatureException ex){
            log.error("Singanture validation failed ", ex.getMessage());
        }
        return false;
    }

    public String getSubject(String token){
        return parseClaims(token).getSubject();
    }

    public String getUsername(String token) {
        return parseClaims(token).get(StandardClaimNames.PREFERRED_USERNAME, String.class);
    }

    private Claims parseClaims(String token){
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
    }
}
