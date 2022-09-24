package id.worx.worx.service.users;

import id.worx.worx.entity.users.RefreshToken;
import id.worx.worx.entity.users.Users;
import id.worx.worx.enums.UserStatus;
import id.worx.worx.exception.TokenRefreshException;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.UsersMapper;
import id.worx.worx.model.request.auth.LoginRequest;
import id.worx.worx.model.request.auth.TokenRefreshRequest;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.auth.JwtResponse;
import id.worx.worx.model.response.auth.TokenRefreshResponse;
import id.worx.worx.model.response.users.UserResponse;
import id.worx.worx.repository.RefreshTokenRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class UsersServiceImpl implements UsersService {
    private final UsersRepository usersRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    public UsersServiceImpl(UsersRepository usersRepository, RefreshTokenRepository refreshTokenRepository) {
        this.usersRepository = usersRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public UserResponse createUser(UserRequest userRequest){

        Optional<Users> getByUsername = usersRepository.findByUsername(userRequest.getUsername());
        if (getByUsername.isPresent()) {
            throw new WorxException("User with username " + userRequest.getUsername() + " is already exist.", HttpStatus.NOT_FOUND.value());
        }

        Optional<Users> getByEmail = usersRepository.findByEmail(userRequest.getEmail());
        if (getByEmail.isPresent()) {
            throw new WorxException("User with email " + userRequest.getEmail() + " is already exist.", HttpStatus.NOT_FOUND.value());
        }

        Users users = new Users();
        users.setEmail(userRequest.getEmail());
        users.setUsername(userRequest.getUsername());
        users.setPhone(userRequest.getPhoneNo());
        users.setStatus(UserStatus.ACTIVE);
        users.setPassword("");

        usersRepository.save(users);

        return null;
    }

    public JwtResponse login(LoginRequest loginRequest) {

        Optional<Users> users = usersRepository.findByEmail(loginRequest.getEmail());
        if(!users.isPresent()){

        }

        return null;
    }

    public TokenRefreshResponse refreshAccessToken(TokenRefreshRequest request) {

        return null;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(),
                "Refresh token was expired. Please make a new signin request");
        }
        return token;
    }
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void logout(TokenRefreshRequest request) {
        deleteRefreshToken(request.getRefreshToken());
    }

    @Transactional
    public void deleteRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
            .orElseThrow(() -> new TokenRefreshException(token,
                "Refresh token is not in database!"));
        refreshTokenRepository.delete(refreshToken);
    }
}
