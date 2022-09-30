package id.worx.worx.util;

import id.worx.worx.entity.users.Users;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    private static String secret = "This_is_secret";
    private static long expiryDuration = 24* 60 * 60 * 1000;

    public String generateJwt(Users users){

        return Jwts.builder()
            .setSubject(users.getId() + ", "+ users.getEmail())
            .setIssuer("AUTH")
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiryDuration))
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
    private Claims parseClaims(String token){
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
    }
}