package id.worx.worx.service.users;

import id.worx.worx.entity.users.Users;
import id.worx.worx.enums.UserStatus;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.UsersMapper;
import id.worx.worx.model.MyUserDetails;
import id.worx.worx.model.request.auth.LoginRequest;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.auth.JwtResponse;
import id.worx.worx.model.response.users.UserResponse;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.util.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
public class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;
    public final PasswordEncoder passwordEncoder;
    private final UsersMapper usersMapper;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    public UsersServiceImpl(UsersRepository usersRepository, PasswordEncoder passwordEncoder, UsersMapper usersMapper) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.usersMapper = usersMapper;
    }

    @Transactional
    public UserResponse createUser(UserRequest userRequest){

        Optional<Users> getByUsername = usersRepository.findByUsername(userRequest.getUsername());
        if (getByUsername.isPresent()) {
            throw new WorxException("User with username " + userRequest.getUsername() + " is already exist.");
        }

        Optional<Users> getByEmail = usersRepository.findByEmail(userRequest.getEmail());
        if (getByEmail.isPresent()) {
            throw new WorxException("User with email " + userRequest.getEmail() + " is already exist.");
        }

        Users users = new Users();
        users.setEmail(userRequest.getEmail());
        users.setUsername(userRequest.getUsername());
        users.setPhone(userRequest.getPhoneNo());
        users.setStatus(UserStatus.ACTIVE);
        users.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        usersRepository.save(users);

        return usersMapper.toDto(users);
    }

    public JwtResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String accessToken = jwtUtil.generateToken((UserDetails) authenticate.getPrincipal());
        return JwtResponse.builder()
            .accessToken(accessToken)
            .email(loginRequest.getEmail())
            .build();
    }
}
