package id.worx.worx.util;

import id.worx.worx.config.properties.WorxProperties;
import id.worx.worx.config.security.JwtExpiredTokenException;
import id.worx.worx.entity.users.Users;
import id.worx.worx.repository.UsersRepository;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Component
@Slf4j
public class JwtUtils {

    private static String secret = "This_is_secret";
    @Autowired
    WorxProperties worxProperties;

    @Autowired
    UsersRepository usersRepository;

    public String generateToken(String email) {
        return createToken(email);
    }

    private String createToken(String subject) {

        Optional<Users> getUsers = usersRepository.findByEmail(subject);
        if (getUsers.isPresent()) {

            Users users = getUsers.get();
            return Jwts.builder()
                    .setSubject(users.getId() + ", " + users.getEmail())
                    .setIssuer("AUTH")
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(
                            System.currentTimeMillis() + worxProperties.getToken().getAccess()))
                    .addClaims(Map.of(StandardClaimNames.PREFERRED_USERNAME, users.getEmail()))
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();
        }

        return null;

    }

    public String generateJwt(Users users) {

        return Jwts.builder()
                .setSubject(users.getId() + ", " + users.getEmail())
                .setIssuer("AUTH")
                .setIssuedAt(new Date())
                .setExpiration(new Date(
                        System.currentTimeMillis() + worxProperties.getToken().getAccess()))
                .addClaims(Map.of(StandardClaimNames.PREFERRED_USERNAME, users.getEmail()))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public boolean validateAccessToken(String token) {

        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException | SignatureException ex) {
            log.error("JWT Token expired : {} ", ex.getMessage());
            throw new JwtExpiredTokenException(token, "JWT Token expired", ex);
        } catch (IllegalArgumentException ex) {
            log.error("Token is null, empty or has only whitespace ", ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.error("JWT is invalid ", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.error("JWT is not supported ", ex.getMessage());
        }
        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    public String getUsername(String token) {
        try {
            return parseClaims(token).get(StandardClaimNames.PREFERRED_USERNAME, String.class);
        } catch (ExpiredJwtException | SignatureException ex) {
            log.trace("JWT Token expired : {} ", ex.getMessage());
            throw new JwtExpiredTokenException(token, "JWT Token expired", ex);
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

}
